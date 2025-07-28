# 🌟 Zwanski Tech – Free Tech Academy, IT Services & Community

Welcome to the Zwanski Tech platform! This project powers [zwanski.org](https://zwanski.org), a modern, multilingual platform offering:

- **Free programming courses and tech education**
- **Professional web development & IT support services**
- **A job marketplace for freelancers and employers**
- **Community forums, live chat, and resources**
- **Free tools like IMEI checker and 3D computer model lookup**

---

## 🚀 Features

- 🌐 Multilingual support (English, Arabic, Hausa, Berber, French)
- 🎓 Free interactive academy with certificates
- 💼 Job marketplace for freelancers & employers
- 🛠️ IT services: web/mobile development, device repair, cybersecurity
- 🧑‍💻 Community: forums, live chat, Telegram integration
- 📱 Free IMEI checker & device tools
- 🖥️ Interactive 3D computer model (React Three Fiber)
- 🤖 AI utilities powered by Supabase edge functions
- 🌙 Dark & light mode, responsive design
- 🔒 GDPR-ready, privacy-focused

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend/DB:** Supabase (Postgres, Auth, Edge Functions)
- **3D/Creative:** Three.js, React Three Fiber
- **Other:** Vite, React Query, Lucide Icons, i18n

---

## 🏁 Getting Started

```bash
git clone https://github.com/zwanski2019/ZWANSKI-TECH.git
cd ZWANSKI-TECH
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Optional variables for hCaptcha security verification:

```bash
HCAPTCHA_SITE_KEY=your-public-site-key-here
HCAPTCHA_SECRET_KEY=your-secret-key-here
```

If `HCAPTCHA_SITE_KEY` is not set, security verification is skipped and users can sign in or sign up without completing hCaptcha.

Set these in your Supabase project secrets so the `get-hcaptcha-config` and `verify-hcaptcha` edge functions can work properly.
Additionally, update `supabase/config.toml` to allow unauthenticated access to these functions:

```toml
[functions.verify-hcaptcha]
verify_jwt = false


[functions.get-hcaptcha-config]
verify_jwt = false

### Blogger API Configuration

The Blog page fetches posts through the Blogger API and requires two values: an
API key and your blog ID. Without them the page can't load posts.

#### Obtain your API key and blog ID
1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create a
   project.
2. Enable the **Blogger API** for that project and generate a new API key under
   **APIs & Services → Credentials**.
3. In your Blogger dashboard, open **Settings → Basic** and note the numeric
   **Blog ID** (also visible in the URL as `blogID=...`).

#### Set the variables
Copy `.env.example` to `.env` and add your values:

```bash
VITE_BLOGGER_API_KEY=your-api-key
VITE_BLOGGER_BLOG_ID=your-blog-id
```

Use the `.env` file for local development. In production these variables must be
provided by your hosting platform's environment settings.

### AI Tools Configuration

The AI utilities rely on OpenAI and Gemini APIs. Set these secrets in your
Supabase project and optionally in a local `.env` file:

```bash
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
ALLOWED_ORIGINS=http://localhost:3000,https://zwanski.org
VITE_CF_TURNSTILE_SITE_KEY=your-public-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
```

`ALLOWED_ORIGINS` controls which domains may call the edge functions.
Include `http://localhost:3000` when running the frontend locally to avoid
CORS errors.
```

### Supabase Blogger Proxy

Use the `blogger-proxy` edge function when you don't want to expose your Blogger credentials in the frontend. Set these secrets in your Supabase project:

```bash
BLOGGER_API_KEY=your-api-key
BLOGGER_BLOG_ID=your-blog-id
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

`ALLOWED_ORIGINS` should list the sites allowed to call the function.

## 💻 Development Setup

Some React and Vite packages depend on slightly different peer versions. This
can cause `npm install` to fail with an **ERESOLVE** dependency tree error. If
you encounter this issue, install packages using the legacy peer dependency
mode:

```bash
npm install --legacy-peer-deps
```

`--force` can also be used if your package manager supports it.

## 🔐 Security Features

✅ **Row Level Security (RLS)** - All tables have proper RLS policies  
✅ **Authentication** - Supabase Auth with email verification  
✅ **Enhanced Input Validation** - Client and server-side validation with XSS protection  
✅ **Rate Limiting** - Contact forms and API endpoints protected from abuse  
✅ **Secure CAPTCHA** - Turnstile verification through secure edge functions  
✅ **Enhanced Admin System** - Multi-layer admin validation with audit logging  
✅ **Security Event Logging** - Comprehensive security monitoring and alerts  
✅ **Password Protection** - Leaked password detection enabled  
✅ **Safe Secret Management** - No secrets exposed in frontend code

## 🔐 Authentication Test

You can verify Supabase sign-in and sign-out using the helper script. Set the
following environment variables with your Supabase credentials and a test user:

```bash
SUPABASE_URL=your-supabase-url \
SUPABASE_ANON_KEY=your-supabase-anon-key \
TEST_EMAIL=your@email \
TEST_PASSWORD=yourpassword \
node scripts/test-login.js
```

The script attempts to sign in with the provided credentials and then signs out, reporting any errors. `SUPABASE_URL` and `SUPABASE_ANON_KEY` are mandatory and must point to your Supabase project.

---

## 📰 Weekly Newsletter Script

Automate sending your latest blog post to newsletter subscribers. The script
`scripts/send-weekly-newsletter.js` fetches the newest entry from your Blogger
RSS feed, loads subscriber emails from Supabase and sends an HTML email via
Resend.

### Usage

1. Copy `.env.example` to `.env` and fill in the variables for Supabase and
   Resend.
2. Run the script manually with:

   ```bash
   node scripts/send-weekly-newsletter.js
   ```

3. Schedule weekly execution with cron or a GitHub Actions workflow. Below is a
   simple GitHub Actions example:

   ```yaml
   on:
     schedule:
       - cron: '0 9 * * 1'
   jobs:
     send-newsletter:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: npm ci
         - run: node scripts/send-weekly-newsletter.js
           env:
             SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
             SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
             RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
   ```

The script keeps a log in the `newsletter_logs` table to avoid sending the same
post more than once in a week.

## 🤖 AI Tools Configuration

Supabase edge functions like `chatgpt-tools` and `gemini-tools` require a few secrets:

```bash
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

Add these variables in the **Project Settings → Environment Variables** section of the Supabase dashboard. Make sure `ALLOWED_ORIGINS` includes `http://localhost:3000` when developing locally.

---

## 📚 Main Sections

- **Academy:** Free programming courses, interactive tutorials, certificates
- **Services:** Web/mobile development, IT support, consulting
- **Marketplace:** Post jobs, hire freelancers, find projects
- **Community:** Forums, chat, Telegram, support
- **Tools:** IMEI checker, 3D computer model, developer utilities

---

## 📝 Contribution Guidelines

We welcome pull requests! To contribute:

1. Fork this repository and create a new branch for your changes.
2. If your update relates to the recent migration from **Turnstile** to **hCaptcha**, mention this in your commit messages.
3. Run `npm run lint` and ensure the project builds successfully with `npm run build`.
4. Open a pull request describing your improvements.

---

## 🤝 Contributing & Support

- **Contact:** [support@zwanski.org](mailto:support@zwanski.org)
- **Telegram:** [Join our channel](https://t.me/zwanski_tech)
- **Support:** [Support page](https://zwanski.org/support)
- **License:** MIT

---

## 📬 Contact & Links

- 🌍 Website: [zwanski.org](https://zwanski.org)
- 🔗 [GitHub](https://github.com/zwanski2019)
- 📷 [Instagram](https://www.instagram.com/mohamed_zwanski)
- 🎥 [TikTok](https://www.tiktok.com/@zwanski.m)
- 🌍 [Linktree](https://linktr.ee/zwanski)

---

> Empowering the next generation of tech innovators and entrepreneurs. Join us today!
