const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required'
  );
}

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
