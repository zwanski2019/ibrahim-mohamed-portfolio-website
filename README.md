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
```

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

You can verify Supabase sign-in and sign-out using the helper script:

```bash
TEST_EMAIL=your@email \
TEST_PASSWORD=yourpassword \
node scripts/test-login.js
```

The script attempts to sign in with the provided credentials and then signs out, reporting any errors.

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
