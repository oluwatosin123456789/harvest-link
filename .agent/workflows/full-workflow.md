---
description: Full development workflow for Harvest-Link — setup, develop, test, deploy
---

# Harvest-Link — Full Development Workflow

## Project Overview

**Harvest-Link** is a geospatial logistics platform connecting Nigerian farmers directly with nearby buyers, reducing post-harvest food loss through location-based matching.

| Layer         | Technology                                         |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 16 (App Router, RSC)                       |
| Language      | TypeScript 5                                       |
| UI            | React 19, Tailwind CSS 4, shadcn/ui (new-york)     |
| Icons         | Lucide React                                       |
| Fonts         | Inter (body) + Playfair Display (display)          |
| Backend / DB  | Supabase (Auth, Database, Storage, Realtime)       |
| Deployment    | Vercel (recommended)                               |

---

## 1. Environment Setup

### 1.1 Prerequisites
- Node.js ≥ 18.x (LTS recommended)
- npm (bundled with Node) or pnpm / yarn
- Git
- A Supabase project (free tier works): https://supabase.com
- A Vercel account (for deployment): https://vercel.com

### 1.2 Clone & Install
```bash
git clone https://github.com/oluwatosin123456789/harvest-link.git
cd harvest-link
npm install
```

### 1.3 Environment Variables
Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# Optional — for server-side admin operations
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

> **Where to find these:** Supabase Dashboard → Settings → API

### 1.4 Start Development Server
// turbo
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## 2. Project Structure

```
harvest-link/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Landing page (/)
│   ├── globals.css               # Tailwind + shadcn/ui theme tokens
│   ├── auth/                     # Auth routes
│   │   ├── login/page.tsx        # /auth/login
│   │   ├── signup/page.tsx       # /auth/signup
│   │   └── select-type/         # /auth/select-type (farmer vs buyer)
│   ├── dashboard/
│   │   ├── farmer/page.tsx       # /dashboard/farmer
│   │   └── buyer/page.tsx        # /dashboard/buyer
│   └── marketplace/page.tsx      # /marketplace
│
├── Components/                   # Shared UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   └── ui/                       # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
│
├── lib/
│   ├── supabase.ts               # Supabase client (needs env vars)
│   └── utils.ts                  # cn() utility for Tailwind merging
│
├── types/
│   ├── index.ts                  # Shared TypeScript types
│   └── database.types.ts         # Supabase-generated DB types
│
├── public/                       # Static assets
│   └── images/
│
├── components.json               # shadcn/ui config
├── tailwind.config (via CSS)     # Tailwind 4 uses CSS-based config
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## 3. Development Workflow

### 3.1 Branching Strategy (Git Flow)
```
main              ← production-ready code
├── develop       ← integration branch
│   ├── feature/* ← new features (feature/auth-login)
│   ├── fix/*     ← bug fixes (fix/supabase-client)
│   └── ui/*      ← UI-only changes (ui/marketplace-cards)
```

```bash
# Create a feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# After work is done
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request → develop
```

### 3.2 Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Use For                          |
| ---------- | -------------------------------- |
| `feat:`    | New feature                      |
| `fix:`     | Bug fix                          |
| `ui:`      | UI/styling changes               |
| `refactor:`| Code restructuring               |
| `docs:`    | Documentation                    |
| `chore:`   | Build/config/tooling changes     |

Example: `feat: add farmer signup form with Supabase auth`

---

## 4. Key Development Tasks (Roadmap)

### Phase 1 — Foundation (Current State → Functional MVP)

#### 4.1 Fix Supabase Client
The current `lib/supabase.ts` is broken (no env vars). Replace with:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

For SSR, also create `lib/supabase-server.ts` using `@supabase/ssr`.

#### 4.2 Set Up Supabase Database
In Supabase Dashboard → SQL Editor, create tables:
- `profiles` (id, user_id, full_name, user_type, phone, location, avatar_url)
- `products` (id, farmer_id, name, description, category, price, quantity, unit, images, location, created_at)
- `orders` (id, buyer_id, farmer_id, product_id, quantity, status, total_price, delivery_address)
- Enable Row Level Security (RLS) on all tables

#### 4.3 Build Auth Pages
- `app/auth/login/page.tsx` — Email/password login form
- `app/auth/signup/page.tsx` — Registration form
- `app/auth/select-type/page.tsx` — Post-signup role selection (Farmer / Buyer)
- Add middleware for route protection (`middleware.ts`)

#### 4.4 Build Dashboard Pages
- `app/dashboard/farmer/page.tsx` — Product listing, add product, orders received
- `app/dashboard/buyer/page.tsx` — Browse nearby farmers, order history, saved items

#### 4.5 Build Marketplace
- `app/marketplace/page.tsx` — Browse all products, search, filter, location-based sorting

### Phase 2 — Core Features
- Geolocation integration (Mapbox / Google Maps / Leaflet)
- Real-time order updates (Supabase Realtime)
- Image upload for products (Supabase Storage)
- Push notifications

### Phase 3 — Polish
- Payment integration (Paystack / Flutterwave)
- Reviews & ratings
- Analytics dashboard
- PWA support for offline use

---

## 5. Adding UI Components (shadcn/ui)

```bash
# Add a new shadcn/ui component
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add select
npx shadcn@latest add toast
```

Components are installed into `Components/ui/` as configured in `components.json`.

---

## 6. Styling Guide

### Theme Tokens
All theme colors are defined in `app/globals.css` using CSS custom properties with `oklch()` values. Supports light and dark mode.

### Tailwind Usage
```tsx
// Use semantic tokens, not raw colors
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
```

### Fonts
- **Inter** → body text (`font-sans`)
- **Playfair Display** → headings / display text (use CSS variable `--font-playfair`)

---

## 7. Testing

### 7.1 Linting
// turbo
```bash
npm run lint
```

### 7.2 Type Checking
// turbo
```bash
npx tsc --noEmit
```

### 7.3 Build Verification
```bash
npm run build
```

### 7.4 Manual Testing Checklist
- [ ] Landing page loads correctly at `/`
- [ ] Navigation links work (Navbar, Footer)
- [ ] Auth flow: signup → select-type → dashboard
- [ ] Auth flow: login → dashboard (correct role)
- [ ] Marketplace displays products
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode toggle (if implemented)

---

## 8. Deployment

### 8.1 Deploy to Vercel
```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel
```

Or connect GitHub repo at https://vercel.com/new and enable auto-deploy on push.

### 8.2 Environment Variables on Vercel
In Vercel Dashboard → Project Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 8.3 Production Build
// turbo
```bash
npm run build
npm run start
```

---

## 9. Useful Commands Reference

| Command                        | Description                          |
| ------------------------------ | ------------------------------------ |
| `npm run dev`                  | Start dev server (http://localhost:3000) |
| `npm run build`                | Create production build              |
| `npm run start`                | Start production server              |
| `npm run lint`                 | Run ESLint                           |
| `npx tsc --noEmit`            | Type-check without emitting          |
| `npx shadcn@latest add <name>`| Add a shadcn/ui component            |
| `npx supabase gen types ...`  | Generate Supabase DB types           |

---

## 10. Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)
