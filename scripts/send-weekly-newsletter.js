#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import Parser from 'rss-parser';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RSS_FEED_URL = process.env.RSS_FEED_URL || 'https://zwanski.org/atom.xml';
const NEWSLETTER_TABLE = process.env.NEWSLETTER_TABLE || 'newsletter_subscribers';
const LOG_TABLE = process.env.NEWSLETTER_LOG_TABLE || 'newsletter_logs';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !RESEND_API_KEY) {
  console.error('Missing environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const resend = new Resend(RESEND_API_KEY);
const parser = new Parser();

async function getLatestPost() {
  const feed = await parser.parseURL(RSS_FEED_URL);
  const item = feed.items?.[0];
  if (!item) throw new Error('No blog posts found');
  return {
    id: item.guid || item.id || item.link,
    title: item.title || 'Untitled',
    link: item.link,
    summary: item.contentSnippet || item.content?.slice(0, 180) || ''
  };
}

async function alreadySent(postId) {
  const { data, error } = await supabase
    .from(LOG_TABLE)
    .select('post_id, sent_at')
    .eq('post_id', postId)
    .gte('sent_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .maybeSingle();
  if (error && error.code !== 'PGRST116') throw error;
  return Boolean(data);
}

async function recordSent(postId) {
  const { error } = await supabase
    .from(LOG_TABLE)
    .insert({ post_id: postId, sent_at: new Date().toISOString() });
  if (error) throw error;
}

async function getSubscribers() {
  const { data, error } = await supabase.from(NEWSLETTER_TABLE).select('email');
  if (error) throw error;
  return (data || []).map(row => row.email);
}

async function sendEmail(post, to) {
  const html = `<h1>${post.title}</h1><p>${post.summary}</p><p><a href="${post.link}">Read more</a></p>`;
  const { error } = await resend.emails.send({
    from: 'newsletter@zwanski.org',
    to,
    subject: `New Blog Post: ${post.title}`,
    html
  });
  if (error) throw error;
}

async function main() {
  const post = await getLatestPost();
  if (await alreadySent(post.id)) {
    console.log('Newsletter already sent for latest post');
    return;
  }
  const subscribers = await getSubscribers();
  if (subscribers.length === 0) {
    console.log('No subscribers found');
    return;
  }
  await sendEmail(post, subscribers);
  await recordSent(post.id);
  console.log(`Newsletter sent to ${subscribers.length} subscribers`);
}

main().catch(err => {
  console.error('Error sending newsletter:', err);
  process.exit(1);
});
