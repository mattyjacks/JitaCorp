# JitaCorp Blog + Forum System - Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Brevo account
- Cloudflare account (for Turnstile)
- Vercel account (for deployment)

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings > API** and copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 1.2 Run Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Create a new query
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and execute

### 1.3 Create Storage Bucket
1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `blog-images`
3. Set it to **Public**
4. Go to **Policies** and add:
   - Allow public read access
   - Allow authenticated users to upload/delete their own files

### 1.4 Configure Google OAuth
1. Go to **Authentication > Providers > Google**
2. Enable Google provider
3. Add your Google OAuth credentials (get from Google Cloud Console)
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

## Step 2: Brevo Email Setup

### 2.1 Create Brevo Account
1. Go to [brevo.com](https://brevo.com) and sign up
2. Go to **Settings > API Keys**
3. Create a new API key
4. Copy the key to `BREVO_API_KEY`

### 2.2 Verify Sender Email
1. Go to **Senders & Contacts > Senders**
2. Add your sender email (e.g., hello@jitacorp.com)
3. Verify the email address

## Step 3: Cloudflare Turnstile Setup

### 3.1 Create Turnstile Site
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Turnstile** in the left sidebar
3. Create a new site
4. Choose **Managed** challenge mode
5. Copy:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`

## Step 4: Local Development

### 4.1 Clone and Install
```bash
cd jc2
npm install
```

### 4.2 Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in all the values from steps 1-3:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
BREVO_API_KEY=your-brevo-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

### 4.3 Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 5: Create Admin User

### 5.1 Sign Up
1. Go to `/login`
2. Sign up with email or Google
3. This creates your user account

### 5.2 Make Admin
1. Go to Supabase dashboard
2. Go to **SQL Editor**
3. Run:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## Step 6: Deployment to Vercel

### 6.1 Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 6.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables (same as `.env.local`)
4. Deploy

### 6.3 Update Supabase Redirect URLs
1. Go to Supabase > Authentication > Providers > Google
2. Add your Vercel URL to redirect URLs:
   - `https://yourdomain.vercel.app/auth/callback`

### 6.4 Update Turnstile Site
1. Go to Cloudflare Turnstile
2. Edit your site
3. Add your Vercel domain to allowed domains

## Database Schema Overview

### Tables
- **profiles** - User profiles with roles (admin, editor, moderator, user)
- **blog_posts** - Blog articles with rich text content
- **blog_comments** - Threaded comments on blog posts
- **forum_categories** - Predefined forum categories
- **forum_threads** - Forum discussion threads
- **forum_replies** - Replies to forum threads
- **forum_thread_votes** - Likes/dislikes on threads
- **forum_reply_votes** - Likes/dislikes on replies
- **forum_reports** - Moderation reports
- **contact_submissions** - Contact form submissions

### Row Level Security (RLS)
All tables have RLS enabled:
- Public read access for published content
- Authenticated users can create/edit their own content
- Admins/Moderators have full access
- Banned users cannot post

## Features Implemented

### Blog System
- ✅ Rich text editor (Tiptap)
- ✅ Image uploads to Supabase Storage
- ✅ Threaded comments
- ✅ Author profiles
- ✅ Categories and tags
- ✅ Draft/publish workflow

### Forum System
- ✅ Predefined categories
- ✅ Threaded discussions
- ✅ Likes and dislikes
- ✅ User bans/suspensions
- ✅ Soft delete with audit trail
- ✅ Report system
- ✅ Moderation dashboard

### Auth
- ✅ Google OAuth
- ✅ Email/password signup
- ✅ Role-based access control
- ✅ Session management

### Contact Form
- ✅ Brevo email integration
- ✅ Cloudflare Turnstile anti-spam
- ✅ Form validation
- ✅ Success/error messages

### Legal
- ✅ Indiana privacy policy
- ✅ Terms of service
- ✅ Cookie policy

## Troubleshooting

### "Cannot find module" errors
Run `npm install` again to ensure all dependencies are installed.

### Supabase connection issues
- Check that `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Ensure RLS policies are properly configured
- Check Supabase dashboard for any errors

### Email not sending
- Verify Brevo API key is correct
- Check that sender email is verified in Brevo
- Check spam folder

### Turnstile not working
- Verify site key matches in code
- Check that domain is added to Turnstile allowed domains
- Clear browser cache

## Next Steps

1. Customize the design by modifying Tailwind classes
2. Add more forum categories in Supabase
3. Create initial blog posts
4. Set up email templates in Brevo
5. Configure custom domain on Vercel
6. Set up analytics (Vercel Analytics, Supabase)
7. Add social media links
8. Set up automated backups

## Support

For issues, check:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Brevo API docs: https://developers.brevo.com
- Cloudflare Turnstile: https://developers.cloudflare.com/turnstile
