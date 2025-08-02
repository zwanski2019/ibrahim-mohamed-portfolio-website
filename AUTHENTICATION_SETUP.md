# Authentication Setup Guide for Zwanski.org

## Overview
This document provides step-by-step instructions for setting up the complete authentication system with Cloudflare Turnstile protection.

## ✅ Features Implemented

### 🔐 Authentication System
- **Complete sign-up/sign-in flows** with email/password
- **Password reset functionality** 
- **Professional UI design** matching zwanski.org aesthetics
- **Toast notifications** for better user experience
- **Form validation** and error handling
- **Loading states** with spinner animations
- **Responsive design** for mobile and desktop

### 🛡️ Security Features
- **Cloudflare Turnstile integration** using `@marsidev/react-turnstile`
- **Server-side token verification** via Edge Function
- **Rate limiting** and security event logging
- **Professional error handling** without exposing sensitive data

### 🎨 Enhanced UI/UX
- **Gradient backgrounds** and modern card design
- **Animated loading states** with Lucide icons
- **Toast notifications** instead of basic alerts
- **Professional typography** with gradient text effects
- **Smooth transitions** and hover effects

## 🚀 Setup Instructions

### 1. Environment Configuration

Create or update your environment variables:

```bash
# Required for Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Required for Cloudflare Turnstile
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
```

### 2. Cloudflare Turnstile Setup

1. **Go to Cloudflare Dashboard**: [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. **Navigate to Turnstile**: Go to "Turnstile" in the left sidebar
3. **Create a new site**:
   - Domain: Your domain (e.g., `zwanski.org`)
   - Widget mode: Managed (recommended)
   - Widget type: Managed Challenge
4. **Copy your Site Key** and add it to `VITE_TURNSTILE_SITE_KEY`
5. **Copy your Secret Key** and add it to Supabase secrets as `CLOUDFLARE_TURNSTILE_SECRET_KEY`

### 3. Supabase Configuration

#### 3.1 Authentication Settings
1. Go to **Authentication > Settings** in Supabase
2. Set **Site URL**: `https://your-domain.com` (or your preview URL)
3. Add **Redirect URLs**:
   - `https://your-domain.com/**`
   - `https://your-preview-url.lovable.app/**`
4. **Disable "Confirm email"** for testing (optional)

#### 3.2 Edge Function Secrets
The following secrets should already be configured in your Supabase project:
- `CLOUDFLARE_TURNSTILE_SECRET_KEY` - Your Cloudflare secret key
- `SUPABASE_URL` - Your Supabase URL  
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### 4. Testing the Setup

#### 4.1 Basic Authentication Flow
1. Navigate to `/auth` on your site
2. Try signing up with a new email
3. Check your email for verification link
4. Try signing in with the credentials
5. Test password reset functionality

#### 4.2 Turnstile Integration
1. Ensure the Turnstile widget appears on both sign-up and sign-in forms
2. Complete the security verification
3. Verify that forms are disabled until Turnstile is completed
4. Check that Turnstile resets after form errors

#### 4.3 Security Testing
1. Try submitting forms without completing Turnstile (should be blocked)
2. Test with invalid credentials (should show appropriate errors)
3. Verify rate limiting works (multiple failed attempts)

### CSRF Token Refresh and Validation

The `/profile/update` endpoint uses a double-submit CSRF token. Clients must:

1. Read the `csrf-token` cookie and send its value in the `X-CSRF-Token` header for each POST request.
2. After a successful response, update the stored token with the new value set in the `csrf-token` cookie.
3. If the token is missing or mismatched, the request will be rejected with a `403` status.

Refreshing the token is automatic; simply capture the latest `csrf-token` cookie after each profile update.

## 🔧 Troubleshooting

### Common Issues

#### Turnstile Not Loading
- **Check site key**: Ensure `VITE_TURNSTILE_SITE_KEY` is correct
- **Domain mismatch**: Verify Cloudflare domain matches your current domain
- **Network issues**: Check browser console for errors

#### Authentication Errors
- **Redirect issues**: Verify Site URL and Redirect URLs in Supabase
- **Email not verified**: Check if email confirmation is required
- **Invalid credentials**: Ensure user exists and password is correct

#### Development vs Production
- **Different domains**: Use different Turnstile sites for dev/prod
- **CORS issues**: Ensure all domains are whitelisted in Supabase
- **Environment variables**: Check that all variables are set correctly

### Error Messages

#### "Security verification failed"
- Invalid Turnstile token
- Expired verification
- Network connectivity issues

#### "Requested path is invalid"
- Incorrect Site URL in Supabase
- Missing redirect URL configuration

#### "User already registered"
- Email already exists in the system
- Try password reset instead

## 📚 Technical Details

### Package Dependencies
```json
{
  "@marsidev/react-turnstile": "^1.0.0",
  "@supabase/supabase-js": "^2.50.0"
}
```

### Key Components
- **`src/pages/Auth.tsx`** - Main authentication page
- **`src/context/AuthContext.tsx`** - Authentication context
- **`src/components/ProtectedRoute.tsx`** - Route protection wrapper
- **`supabase/functions/verify-turnstile/index.ts`** - Server-side verification

### Security Features
- **Client-side validation** with Turnstile widget
- **Server-side verification** via Edge Function
- **Rate limiting** protection
- **Security event logging** for audit trails
- **Error handling** without information disclosure

## 🎯 Next Steps

### Optional Enhancements
1. **Social Authentication** (Google, GitHub, etc.)
2. **Two-Factor Authentication** (2FA)
3. **Account verification** via phone/SMS
4. **Advanced password policies**
5. **Session management** improvements

### Analytics & Monitoring
1. **Authentication metrics** tracking
2. **Security incident** monitoring
3. **User behavior** analysis
4. **Performance optimization**

## 📞 Support

If you encounter any issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a fresh browser session/incognito mode
4. Review Supabase Auth logs for server-side errors

---

**Last Updated**: January 2025
**Version**: 1.0.0