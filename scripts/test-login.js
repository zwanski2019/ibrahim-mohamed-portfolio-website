const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ceihcnfngpmrtqunhaey.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWhjbmZuZ3BtcnRxdW5oYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTIwNzMsImV4cCI6MjA2NTY4ODA3M30.I2Yit_peN5PiTq54Y-4hrDowH3wEWa7lZPT0UgKdXSc';

const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  console.error('Please set TEST_EMAIL and TEST_PASSWORD environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const run = async () => {
  console.log(`Attempting to sign in as ${TEST_EMAIL}`);

  const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  if (signInError) {
    console.error('Sign in failed:', signInError.message);
    process.exit(1);
  }

  console.log('Signed in successfully as', sessionData.user.email);

  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    console.error('Sign out failed:', signOutError.message);
    process.exit(1);
  }

  console.log('Signed out successfully');
};

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
