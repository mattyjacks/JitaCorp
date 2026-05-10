# JitaCorp jc2 - Project Structure

## Directory Layout

```
jc2/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar & Footer
│   ├── page.tsx                 # Homepage (from jc1)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Contact form API (Brevo + Turnstile)
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx         # Individual blog post with comments
│   ├── forum/
│   │   ├── page.tsx             # Forum categories listing
│   │   ├── [category]/
│   │   │   ├── page.tsx         # Category threads listing
│   │   │   └── [threadId]/
│   │   │       └── page.tsx     # Individual thread with replies
│   ├── investors/
│   │   └── page.tsx             # Static investors page
│   ├── contact/
│   │   └── page.tsx             # Contact form page
│   ├── login/
│   │   └── page.tsx             # Auth page (Google + Email)
│   ├── dashboard/
│   │   ├── page.tsx             # User dashboard
│   │   ├── blog/
│   │   │   ├── page.tsx         # My blog posts
│   │   │   └── new/
│   │   │       └── page.tsx     # Create new post
│   │   └── settings/
│   │       └── page.tsx         # Account settings
│   ├── privacy/
│   │   └── page.tsx             # Privacy policy (Indiana compliant)
│   └── globals.css              # Global styles
│
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── RichTextEditor.tsx       # Tiptap rich text editor
│   ├── BlogCard.tsx             # Blog post card component
│   ├── ForumThread.tsx          # Forum thread component
│   ├── ForumReply.tsx           # Forum reply component
│   ├── CommentThread.tsx        # Threaded comments
│   ├── VoteButtons.tsx          # Like/dislike buttons
│   ├── ContactForm.tsx          # Contact form with Turnstile
│   └── AuthForm.tsx             # Login/signup form
│
├── lib/
│   ├── supabase.ts              # Browser Supabase client
│   ├── supabase-server.ts       # Server Supabase client
│   ├── utils.ts                 # Utility functions
│   └── types.ts                 # TypeScript types
│
├── supabase/
│   └── schema.sql               # Database schema (run in Supabase)
│
├── public/
│   └── images/                  # Static images
│
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (git ignored)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.ts               # Next.js config
├── SETUP.md                     # Setup instructions
├── PROJECT_STRUCTURE.md         # This file
└── README.md                    # Project overview
```

## Key Files Explained

### App Routes

#### `/` - Homepage
- Displays the beautiful jc1 design
- Hero section, mission, model, impact, CTA
- No authentication required

#### `/blog` - Blog Listing
- Shows all published blog posts
- Pagination
- Search and filter by category/tags
- No authentication required

#### `/blog/[slug]` - Individual Blog Post
- Full blog post with rich text content
- Author information
- Threaded comments section
- No authentication required to view
- Login required to comment

#### `/forum` - Forum Categories
- Lists all forum categories
- Shows thread count and last activity
- No authentication required

#### `/forum/[category]/[threadId]` - Forum Thread
- Displays thread with all replies
- Threaded conversation view
- Like/dislike buttons on threads and replies
- No authentication required to view
- Login required to reply

#### `/contact` - Contact Form
- Contact form with fields: name, email, subject, message
- Cloudflare Turnstile anti-spam
- Brevo email integration
- Form submission saved to database

#### `/login` - Authentication
- Email/password signup and login
- Google OAuth button
- Password reset
- Email verification

#### `/dashboard` - User Dashboard
- View user profile
- My blog posts (if author)
- My forum activity
- Account settings
- Requires authentication

#### `/privacy` - Privacy Policy
- Indiana-compliant privacy policy
- Data collection disclosure
- Cookie policy
- User rights

### Components

#### RichTextEditor.tsx
- Tiptap-based rich text editor
- Supports: bold, italic, underline, headings, lists, links, images
- Image upload to Supabase Storage
- Used in blog post creation and forum posts

#### VoteButtons.tsx
- Like/dislike buttons
- Shows vote counts
- Prevents duplicate votes
- Used on forum threads and replies

#### CommentThread.tsx
- Displays threaded comments
- Nested replies
- Reply form
- Delete own comments

#### ContactForm.tsx
- Form with Turnstile verification
- Brevo email integration
- Form validation
- Success/error messages

### Database Schema

#### Users & Profiles
- `profiles` - User profiles with roles and ban status

#### Blog
- `blog_posts` - Blog articles
- `blog_comments` - Threaded comments on posts

#### Forum
- `forum_categories` - Forum categories
- `forum_threads` - Discussion threads
- `forum_replies` - Replies to threads
- `forum_thread_votes` - Likes/dislikes on threads
- `forum_reply_votes` - Likes/dislikes on replies
- `forum_reports` - Moderation reports

#### Other
- `contact_submissions` - Contact form submissions

## Authentication Flow

1. User visits `/login`
2. User chooses Google OAuth or Email/Password
3. Supabase handles authentication
4. User is redirected to dashboard or previous page
5. User session stored in cookies
6. Navbar shows user profile and logout button

## Authorization

### Public Access
- Homepage, blog listing, individual posts, forum categories, threads, replies
- Contact form, privacy policy, investors page

### Authenticated Users
- Can comment on blog posts
- Can create forum threads and replies
- Can like/dislike threads and replies
- Can view own dashboard

### Authors/Editors
- Can create and edit blog posts
- Can delete own posts
- Can see draft posts

### Moderators
- Can delete any forum thread or reply
- Can view moderation reports
- Can ban users

### Admins
- Full access to all features
- Can manage users, roles, and content
- Can access moderation dashboard

## Styling

- **Framework**: Tailwind CSS
- **Design System**: From jc1/index.html
- **Colors**:
  - Navy: `#0b1d3a`
  - Teal: `#0ea5a0`
  - Gold: `#e8b931`
  - Cream: `#faf8f4`
- **Typography**:
  - Sans: Inter
  - Serif: Playfair Display

## API Routes

### POST /api/contact
- Validates Turnstile token
- Sends email via Brevo
- Saves submission to database
- Returns success/error response

### Additional API Routes (to be created)
- POST /api/blog/posts - Create blog post
- PUT /api/blog/posts/[id] - Update blog post
- DELETE /api/blog/posts/[id] - Delete blog post
- POST /api/blog/comments - Create comment
- POST /api/forum/threads - Create thread
- POST /api/forum/replies - Create reply
- POST /api/forum/votes - Like/dislike
- POST /api/forum/reports - Report content

## Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Brevo
BREVO_API_KEY=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## Development Workflow

1. Create feature branch: `git checkout -b feature/blog-system`
2. Make changes
3. Test locally: `npm run dev`
4. Commit: `git commit -m "Add blog system"`
5. Push: `git push origin feature/blog-system`
6. Create pull request on GitHub
7. Deploy to Vercel automatically

## Deployment

- **Hosting**: Vercel
- **Database**: Supabase (cloud)
- **Storage**: Supabase Storage (blog images)
- **Email**: Brevo
- **Anti-spam**: Cloudflare Turnstile
- **Domain**: Custom domain via Vercel

## Performance Considerations

- Images optimized with Next.js Image component
- Database queries use indexes
- RLS policies prevent unauthorized access
- Caching headers set appropriately
- Lazy loading for comments and replies

## Security

- Row-level security (RLS) in Supabase
- HTTPS/TLS encryption in transit
- Password hashing via Supabase Auth
- Turnstile anti-spam on contact form
- CSRF protection via Next.js
- XSS protection via React
- SQL injection prevention via parameterized queries

## Future Enhancements

- [ ] Email notifications for replies
- [ ] User mentions (@username)
- [ ] Markdown support
- [ ] Blog post scheduling
- [ ] Advanced search
- [ ] User reputation system
- [ ] Badges and achievements
- [ ] Newsletter signup
- [ ] Social sharing buttons
- [ ] Analytics dashboard
- [ ] Admin moderation panel
- [ ] User activity feed
