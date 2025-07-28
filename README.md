# 🌟 Zwanski Tech – Free Tech Academy, IT Services & Community

Welcome to the Zwanski Tech platform! This project powers [zwanski.org](https://zwanski.org), a modern, multilingual platform offering:

* **Free programming courses and tech education**
* **Professional web development & IT support services**
* **A job marketplace for freelancers and employers**
* **Community forums, live chat, and resources**
* **Free tools like IMEI checker and 3D computer model lookup**

---

## 🚀 Features

* 🌐 Multilingual support (English, Arabic, Hausa, Berber, French)
* 🎓 Free interactive academy with certificates
* 💼 Job marketplace for freelancers & employers
* 🛠️ IT services: web/mobile development, device repair, cybersecurity
* 🧑‍💻 Community: forums, live chat, Telegram integration
* 📱 Free IMEI checker & device tools
* 🖥️ Interactive 3D computer model (React Three Fiber)
* 🤖 AI utilities powered by Supabase Edge Functions
* 🌙 Dark & light mode, responsive design
* 🔒 GDPR-ready, privacy-focused

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
* **Backend/DB:** Supabase (Postgres, Auth, Edge Functions)
* **3D/Creative:** Three.js, React Three Fiber
* **Other:** Vite, React Query, Lucide Icons, i18n

---

## 🏁 Getting Started

```bash
git clone https://github.com/zwanski2019/ZWANSKI-TECH.git
cd ZWANSKI-TECH
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📋 Environment Variables

Create a `.env` file (copy from `.env.example`) and add the following variables:

### hCaptcha Verification (optional)

```bash
HCAPTCHA_SITE_KEY=your-public-site-key-here
HCAPTCHA_SECRET_KEY=your-secret-key-here
```

If not set, hCaptcha checks are skipped, allowing sign-in/sign-up without verification.

---

### Blogger API Configuration

```bash
VITE_BLOGGER_API_KEY=your-api-key
VITE_BLOGGER_BLOG_ID=your-blog-id
```

1. In the Google Cloud Console, enable the **Blogger API** and create an API key under **APIs & Services → Credentials**.
2. In your Blogger dashboard, find your **Blog ID** in **Settings → Basic** or the URL parameter `blogID`.
3. Set these values in your `.env` (for local development) and in your Supabase project secrets for production.

---

### Supabase Blogger Proxy (optional)

To avoid exposing credentials in the frontend, use the `blogger-proxy` edge function:

```bash
BLOGGER_API_KEY=your-api-key
BLOGGER_BLOG_ID=your-blog-id
ALLOWED_ORIGINS=http://localhost:3000,https://zwanski.org
```

Configure these in **Supabase → Settings → Environment Variables**.

---

### AI Tools Configuration

```bash
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
ALLOWED_ORIGINS=http://localhost:3000,https://zwanski.org
VITE_CF_TURNSTILE_SITE_KEY=your-public-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
```

Ensure `ALLOWED_ORIGINS` covers all domains calling your edge functions.

---

## 💻 Development Setup

If you encounter an **ERESOLVE** dependency error during `npm install`, retry with legacy peer dependencies:

```bash
npm install --legacy-peer-deps
```

Or use `--force` if supported by your package manager.

---

## 🔐 Security Features

* ✅ **Row Level Security (RLS)** – Strict policies on all tables
* ✅ **Authentication** – Supabase Auth with email verification
* ✅ **Input Validation** – XSS protection, client/server checks
* ✅ **Rate Limiting** – Abuse protection on forms and APIs
* ✅ **Secure CAPTCHA** – Turnstile/hCaptcha via Edge Functions
* ✅ **Admin Audit Logging** – Multi-layer validation with logs
* ✅ **Security Event Logging** – Alerts and monitoring
* ✅ **Password Protection** – Leaked password detection
* ✅ **Secret Management** – No frontend exposure

---

## 🔐 Authentication Test

Test sign-in/sign-out flows with:

```bash
SUPABASE_URL=your-supabase-url \
SUPABASE_ANON_KEY=your-supabase-anon-key \
TEST_EMAIL=your@email \
TEST_PASSWORD=yourpassword \
node scripts/test-login.js
```

---

## 📰 Weekly Newsletter Script

Automate sending your latest blog post to subscribers via Resend. Configure `.env` and run:

```bash
node scripts/send-weekly-newsletter.js
```

Schedule weekly in GitHub Actions or cron:

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

Keeps logs in `newsletter_logs` to prevent duplicates.

---

## 📚 Main Sections

* **Academy:** Free courses, interactive tutorials, certificates
* **Services:** Web/mobile development, IT support, consulting
* **Marketplace:** Post jobs, hire freelancers, find projects
* **Community:** Forums, chat, Telegram integration
* **Tools:** IMEI checker, 3D model viewer, developer utilities

---

## 📝 Contribution Guidelines

1. Fork the repo and create a feature branch.
2. Reference any Turnstile → hCaptcha migration in commits.
3. Run `npm run lint` and `npm run build` before submitting.
4. Open a PR describing your changes.

---

## 🤝 Support & Links

* **Contact:** [support@zwanski.org](mailto:support@zwanski.org)
* **Telegram:** [@zwanski\_tech](https://t.me/zwanski_tech)
* **GitHub:** [https://github.com/zwanski2019](https://github.com/zwanski2019)
* **Instagram:** [https://www.instagram.com/mohamed\_zwanski](https://www.instagram.com/mohamed_zwanski)
* **TikTok:** [https://www.tiktok.com/@zwanski.m](https://www.tiktok.com/@zwanski.m)
* **Linktree:** [https://linktr.ee/zwanski](https://linktr.ee/zwanski)

---

> Empowering the next generation of tech innovators and entrepreneurs. Join us today!
