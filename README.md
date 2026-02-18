# Paraspect Storybook WebApp

A Next.js (App Router) web app to generate personalized children's storybooks with authentication, AI story generation, payment checkout, printable layouts, PDF delivery, and WhatsApp notifications.

## Phase coverage

- ✅ **Phase 1 (Setup):** Next.js app scaffold, `basePath` and `assetPrefix` set to `/storybook`.
- ✅ **Phase 2 (UI/UX):** Mobile-first landing page, hero CTA, Navbar/Footer, branding colors, Google font.
- ✅ **Phase 3 (Auth):** NextAuth with Google provider, SessionProvider wrapping app.
- ✅ **Phase 4 (AI Engine):** `/create` story wizard, `/api/generate` route with Gemini system prompt + 10-page parsing and visual DNA/seed.
- ✅ **Phase 5 (Payments):** Razorpay script + `/api/create-order` and webhook route.
- ✅ **Phase 6 (Delivery):** Print page with page breaks, PDF generation route, Supabase upload, WhatsApp notify route.

## Local run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000/storybook`

## Environment variables

### Core
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (e.g. `https://yourdomain.com`)

### NextAuth
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Run SQL schema:

```sql
-- supabase/schema.sql
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  child_name text not null,
  input jsonb not null,
  pages jsonb not null,
  visual_dna text,
  seed bigint,
  amount integer default 0,
  is_paid boolean default false,
  pdf_url text,
  created_at timestamptz default now()
);
```

### Razorpay
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

### WhatsApp Cloud API
- `WHATSAPP_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_TEMPLATE_NAME`

## Deploy on Vercel
1. Push this repository to GitHub (private repo `paraspect-storybook`).
2. Import to Vercel.
3. Add the env vars listed above.
4. Ensure deployment path uses `/storybook` base path.

