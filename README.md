This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
 Smart Bookmark App

A full-stack bookmark manager built using Next.js (App Router) and Supabase.

Users can log in with Google, add bookmarks, view their own bookmarks, and see real-time updates across tabs.

 Tech Stack

Frontend: Next.js (App Router) + Tailwind CSS

Backend: Supabase (Auth + Database + Realtime)

Authentication: Google OAuth

Database: PostgreSQL (via Supabase)

Deployment: Vercel

 Features:
 Google Login (OAuth only)

 Add bookmark (Title + URL)

 User-specific bookmarks (Row Level Security)

 Real-time updates (no refresh needed)

 Delete bookmarks

 Deployed on Vercel

 Authentication

Users sign in using Google OAuth.
Supabase handles authentication securely.

Row Level Security (RLS) ensures:

Users can only see their own bookmarks

Users can only insert/delete their own bookmarks

Problems I Faced & How I Solved Them
1️⃣ Google OAuth "Unsupported provider" Error

Problem:
When trying to log in, I got this error:

Unsupported provider: provider is not enabled

Cause:
Google provider was not enabled in Supabase.

Solution:

Went to Supabase → Authentication → Sign In / Providers

Enabled Google provider

Added Client ID and Client Secret from Google Cloud Console

Saved changes

2️⃣ Google OAuth Redirect Issues

Problem:
Google login was failing or redirecting incorrectly.

Cause:
Incorrect or missing redirect URI in Google Cloud Console.

Solution:

Copied Supabase Project URL

Added this redirect URI in Google Cloud:

https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback

After updating, login worked properly.

3️⃣ Tailwind CSS Not Applying Styles

Problem:
UI looked plain and Tailwind classes were not working.

Cause:
Incorrect Tailwind/PostCSS configuration due to version mismatch.

Solution:

Reinstalled Tailwind v3

Fixed postcss.config.js

Ensured globals.css had:

@tailwind base;
@tailwind components;
@tailwind utilities;

Restarted development server

After that, styles worked correctly.

4️⃣ Supabase Environment Variables Not Working

Problem:
Supabase connection failed.

Cause:
Environment variables were not added properly.

Solution:

Added .env.local file

Added:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Restarted the server

5️⃣ Realtime Not Working Initially

Problem:
Bookmarks were not updating across tabs.

Cause:
Realtime was not enabled for the bookmarks table.

Solution:

Enabled Realtime for bookmarks table in Supabase

Verified subscription logic in frontend

6️⃣ Deployment Environment Variables Missing

Problem:
App worked locally but failed after deployment.

Cause:
Environment variables were not added in Vercel.

Solution:

Added NEXT_PUBLIC_SUPABASE_URL

Added NEXT_PUBLIC_SUPABASE_ANON_KEY

Redeployed project

📦 How to Run Locally

Clone repository

git clone <repo-url>
cd smart-bookmark-app

Install dependencies

npm install

Create .env.local file and add:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Run project

npm run dev

Open:

http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
