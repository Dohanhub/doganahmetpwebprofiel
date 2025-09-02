# 🗄️ Database Setup Guide

## Quick Setup (5 minutes)

### 1. Create Neon Database
```bash
1. Go to https://console.neon.tech
2. Sign up/Login with GitHub
3. Create new project: "doganahmetprofile"
4. Copy the connection string
```

### 2. Set Environment Variables in Vercel
```bash
# Go to Vercel Dashboard → Your Project → Settings → Environment Variables
# Add these variables:

DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
OPENAI_API_KEY=sk-your-openai-api-key-here
SESSION_SECRET=generate-32-char-random-string-here
JWT_SECRET=generate-32-char-random-string-here
ALLOWED_ORIGINS=https://your-domain.com,https://doganahmetprofile.vercel.app
```

### 3. Deploy and Run Migration
```bash
# After setting DATABASE_URL, deploy will automatically run:
npm run db:push
```

## What the Database Stores

Your site uses the database for:
- **Contact Forms** - Store client inquiries
- **Consultation Booking** - Schedule meetings
- **AI Chat History** - Track conversations
- **Client Testimonials** - Display reviews
- **Project Portfolio** - Showcase work
- **Lead Management** - Track potential clients

## Database Tables Created
- `contacts` - Contact form submissions
- `consultations` - Meeting bookings
- `testimonials` - Client reviews
- `projects` - Portfolio items
- `project_calculations` - Budget estimates
- `chat_sessions` - AI conversations
- `users` - Admin access
