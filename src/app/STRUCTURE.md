# High-Level `src/app` Folder Structure

```txt
src/app
├── (legal)/
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts
├── components/
│   └── interview-wizard.tsx
├── dashboard/
│   └── page.tsx
├── story/
│   ├── create/
│   │   └── page.tsx
│   └── preview/
│       └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

This structure keeps feature routes modular and ready for Phase 2 integrations.
