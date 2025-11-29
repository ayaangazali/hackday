# Authentication Guide for iSPY

## Overview
iSPY uses Stack Auth for authentication with email/password and Google OAuth support.

## How to Sign Up

### Method 1: Email & Password
1. Visit `http://localhost:3000`
2. Click "Start Free Trial" or navigate to `/sign-up`
3. Enter your email and password
4. Click "Sign up"
5. You'll be automatically redirected to the dashboard

### Method 2: Google OAuth
1. Visit `http://localhost:3000/sign-in`
2. Click "Continue with Google"
3. Select your Google account
4. You'll be automatically redirected to the dashboard

## How to Sign In

### Method 1: Email & Password
1. Visit `http://localhost:3000/sign-in`
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### Method 2: Google OAuth
1. Visit `http://localhost:3000/sign-in`
2. Click "Continue with Google"
3. Select your Google account
4. You'll be redirected to the dashboard

## How to Sign Out

### From Dashboard
1. Click on your user avatar in the top-right corner
2. Click "Sign out" from the dropdown menu
3. You'll be redirected to the landing page

## Protected Routes
The following routes require authentication:
- `/pages/dashboard` - Main dashboard
- `/pages/statistics` - Analytics page
- `/pages/saved-videos` - Video library
- `/pages/upload` - Upload videos
- `/pages/realtimeStreamPage` - Live stream monitoring
- `/pages/video/*` - Individual video pages

If you try to access these routes without being logged in, you'll be automatically redirected to `/sign-in`.

## Auto-Redirect Behavior
- **Not logged in** → Accessing protected routes → Redirects to `/sign-in`
- **Logged in** → Accessing `/` (home) → Redirects to `/pages/dashboard`
- **After sign in** → Redirects to `/pages/dashboard`
- **After sign out** → Redirects to `/` (landing page)

## User Profile Features
- View your email address in the dropdown menu
- Profile image display (if available)
- Access to account settings
- Quick logout functionality

## Forgot Password
1. Visit `/forgot-password`
2. Enter your email
3. Check your email for a reset link
4. Follow the link to reset your password

## Tech Stack
- **Stack Auth** (@stackframe/stack) - Authentication provider
- **Next.js Middleware** - Route protection
- **Cookie-based sessions** - Secure token storage
