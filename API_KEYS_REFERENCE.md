# iSPY - Complete API Keys Reference

## Required API Keys

Your application now requires the following API keys:

### 1. Google Gemini API
```env
GEMINI_API_KEY=your_key_here
```
- **Used for**: Chat, image analysis, video analysis, summaries
- **Get it from**: https://aistudio.google.com/app/apikey
- **Models used**: Gemini 1.5 Flash (all AI features)

### 2. Stack Auth
```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_public_key_here
STACK_SECRET_SERVER_KEY=your_secret_key_here
```
- **Used for**: User authentication (sign up, sign in, password reset)
- **Get it from**: https://app.stack-auth.com/
- **Already configured**: ✅ Yes (values provided)

### 3. Resend API (Optional)
```env
RESEND_API_KEY=your_key_here
```
- **Used for**: Sending email alerts for dangerous events
- **Get it from**: https://resend.com/api-keys
- **Status**: Optional - only needed if you want email notifications

---

## Current .env File

Your `.env` file should contain:

```env
# Google Gemini API Key - Used for all AI functionality (chat, image analysis, summaries)
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Stack Auth - Used for authentication
# Get your credentials from: https://app.stack-auth.com/
NEXT_PUBLIC_STACK_PROJECT_ID=73131c53-e401-45c4-acec-931dea0dff7a
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_sby688mkvezqyvh6gbd9j7vvese2xnbd63kn4wzsh4be0
STACK_SECRET_SERVER_KEY=ssk_ynfrrjc46xkkabsv2dtxwtha2ebta690x318x3wegvyq0

# Resend API Key (Optional - for email alerts)
# Get your key from: https://resend.com/api-keys
# RESEND_API_KEY=your_resend_key_here
```

---

## What Was Removed

### ❌ No Longer Needed:
- ~~`GOOGLE_API_KEY`~~ (was for Gemini)
- ~~`GEMINI_API_KEY`~~ (was for Gemini)
- ~~`CEREBRAS_API_KEY`~~ (was for Cerebras LLM)
- ~~`TOGETHER_API_KEY`~~ (was for Together AI vision)
- ~~`NEXT_PUBLIC_SUPABASE_URL`~~ (was for Supabase auth)
- ~~`NEXT_PUBLIC_SUPABASE_ANON_KEY`~~ (was for Supabase auth)

---

## Summary

### ✅ Required (2-3 keys):
1. **GEMINI_API_KEY** ← Need to add
2. **NEXT_PUBLIC_STACK_PROJECT_ID** ← Already have ✓
3. **NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY** ← Already have ✓
4. **STACK_SECRET_SERVER_KEY** ← Already have ✓
5. **RESEND_API_KEY** ← Optional (only for email alerts)

### Total API Providers: 2
1. **Google Gemini** - For all AI features
2. **Stack Auth** - For authentication

---

## Quick Start

1. Your `.env` file is already configured with Stack Auth credentials ✅
2. **Add your Gemini API key** to `.env` file
3. Run `npm run dev` to start the application
4. Test sign up, sign in, and protected routes
5. Test video analysis and chat features

**Status**: ⚠️ Need to add GEMINI_API_KEY
