const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const NEW_ADMIN_EMAIL = process.env.NEW_ADMIN_EMAIL;
const NEW_ADMIN_PASSWORD = process.env.NEW_ADMIN_PASSWORD;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}
if (!NEW_ADMIN_EMAIL || !NEW_ADMIN_PASSWORD) {
  console.error('NEW_ADMIN_EMAIL and NEW_ADMIN_PASSWORD must be set');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: user, error } = await supabase.auth.admin.createUser({
    email: NEW_ADMIN_EMAIL,
    password: NEW_ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error('Failed to create user:', error.message);
    process.exit(1);
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ user_type: 'admin' })
    .eq('id', user.user.id);

  if (profileError) {
    console.error('Failed to update profile:', profileError.message);
    process.exit(1);
  }

  console.log('Admin user created:', NEW_ADMIN_EMAIL);
}

run();

