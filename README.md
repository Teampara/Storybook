# Paraspect AI Storybook (Phase 1.1)

This repository includes a **Next.js 15 + TypeScript + Tailwind CSS** foundation.

## Quick start

```bash
npm install
npm run dev
```

Open: `http://localhost:3000/storybook`

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run test:smoke
```

## Included in this phase

- Next.js 15 App Router setup
- Tailwind CSS setup
- Base path config for sub-path deployment (`/storybook`)
- Mobile-first layout with brand navigation
- 3-step Interview Wizard component
- Placeholder routes for dashboard, story create/preview, legal pages, and auth route

## Troubleshooting dependency install (E403)

If `npm install` fails with `403 Forbidden` in a restricted environment:

1. Confirm your org-approved npm registry URL.
2. Copy `.npmrc.example` to `.npmrc` and configure registry/auth.
3. Retry install with your network policy-compliant proxy settings.

Example:

```bash
npm config set registry <your-approved-registry>
npm install
```

## Planned next phase

- Supabase schema + Auth.js (Google)
- AI generation pipeline (Gemini + image provider)
- Razorpay checkout integration
- PDF generation endpoint with Puppeteer
