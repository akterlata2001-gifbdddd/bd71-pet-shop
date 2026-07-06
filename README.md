# 🐾 BD71 Pet Shop — Premium Pet Food E-Commerce Frontend

A modern, elegant, fully-responsive multi-page e-commerce frontend for **BD71 Pet Shop** — a Bangladeshi online store for premium pet food (cats, dogs, birds, fish). Built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.

> Reference site: [bd71shop.com.bd](https://bd71shop.com.bd)

---

## ✨ Features

### 📄 15 Pages (Single-Page App with client-side routing)
- **Home** — Hero, features, promo banners, featured products, categories, blog preview, newsletter
- **Shop** — Sidebar filters (categories, brands, price range), sort, grid/list view, mobile filter drawer
- **Product Detail** — Image gallery, quantity selector, tabs (Description / Features / Reviews), related products
- **Cart** — Quantity controls, coupon field, order summary, free-delivery progress, recommended products
- **Checkout** — Contact info, shipping address, payment method (COD / bKash / Nagad / Card), success screen
- **About** — Brand story, animated pet illustrations, stats, values, team
- **Contact** — Contact form, business hours, FAQ accordion, decorative map
- **Blog List** — Featured post, search, category filters
- **Blog Single** — Full article with table of contents, share buttons, related posts
- **Privacy Policy / Terms of Use / DMCA / Disclaimer** — Legal pages with TOC
- **404 Not Found** — Animated fallback page
- **Account** — Login/Register toggle + dashboard (orders, wishlist, settings)

### 🛒 Interactive Features
- **Slide-out Cart Drawer** — Auto-opens when an item is added
- **Persistent cart state** — survives page navigation (zustand store)
- **Client-side routing** — smooth animated page transitions
- **Live filtering & sorting** — instant results on Shop page
- **Add-to-cart feedback** — button morphs to "Added ✓"
- **Newsletter subscription** — success animation
- **Fully linked home page** — every section navigates somewhere

### 🎨 Design System
- **Warm pet-friendly palette** — cream, terracotta, sage, amber-glow, cocoa
- **Custom fonts** — Fredoka (display) + Quicksand (body)
- **Custom SVG illustrations** — cat, dog, fish, bird, paw (no external images)
- **Framer Motion animations** — floating pets, rotating rings, hover effects
- **Mobile-first responsive** — works beautifully on all screen sizes
- **Sticky footer** — proper layout with `min-h-screen flex flex-col`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS 4** + shadcn/ui (New York) |
| State | **Zustand** (cart + router) |
| Animation | **Framer Motion** |
| Icons | **Lucide React** |
| Fonts | Fredoka + Quicksand (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css         # Theme, palette, animations
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Main router (switches between pages)
├── components/
│   ├── pages/              # All 15 page components
│   │   ├── home.tsx
│   │   ├── shop.tsx
│   │   ├── product-detail.tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── blog.tsx
│   │   ├── blog-single.tsx
│   │   ├── legal.tsx
│   │   ├── account.tsx
│   │   └── not-found.tsx
│   └── site/               # Shared components
│       ├── header.tsx      # Sticky nav with mega-menu
│       ├── footer.tsx      # 4-column footer
│       ├── cart-drawer.tsx # Slide-out cart
│       ├── product-card.tsx
│       ├── sections.tsx    # Features, PromoBanners, WhyChooseUs
│       └── icons.tsx       # Custom SVG illustrations
└── lib/
    ├── store.ts            # Zustand router + cart stores
    ├── data.ts             # Products, blog posts, categories
    └── utils.ts            # shadcn helper
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm / yarn / bun

### Installation

```bash
# Clone the repo
git clone https://github.com/akterlata2001-gifbdddd/bd71-pet-shop.git
cd bd71-pet-shop

# Install dependencies
bun install   # or npm install

# Start dev server
bun run dev   # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to DB |

---

## 🎯 Pages Overview

| Page | Route (SPA) | Description |
|------|-------------|-------------|
| Home | `home` | Landing page with all sections |
| Shop | `shop` | Product listing with filters |
| Product | `product?id=X` | Single product detail |
| Cart | `cart` | Shopping cart |
| Checkout | `checkout` | Multi-step checkout |
| About | `about` | Brand story |
| Contact | `contact` | Contact form + FAQ |
| Blog | `blog` | Article listing |
| Blog Single | `blog-single?id=X` | Full article |
| Privacy | `privacy` | Privacy policy |
| Terms | `terms` | Terms of use |
| DMCA | `dmca` | DMCA policy |
| Disclaimer | `disclaimer` | Legal disclaimer |
| Account | `account` | Login / Register / Dashboard |
| 404 | `not-found` | Not found fallback |

---

## 🐾 Categories Covered

- 🐱 **Cat Food** — Purina, Royal Canin, Whiskas, Orijen, Drools & more
- 🐶 **Dog Food** — Drools, Purina Pro Plan, Orijen
- 🐠 **Fish Food** — Haisenpet tropical flakes
- 🦜 **Bird Food** — Nature Bridge seed mixes
- 🪨 **Cat Litter** — Bentonite clumping, premium quality
- 💉 **Pet Care** — Wellness essentials & vaccines

---

## 📦 What's Included

- ✅ 16 products with full descriptions, features, SKUs
- ✅ 6 blog posts with complete article content
- ✅ 6 product categories
- ✅ 4 legal documents (Privacy, Terms, DMCA, Disclaimer)
- ✅ 4 payment methods (COD, bKash, Nagad, Card)
- ✅ Bangladeshi Taka (৳) currency formatting
- ✅ Responsive on mobile, tablet, desktop

---

## 🎨 Color Palette

| Color | OKLCH | Usage |
|-------|-------|-------|
| Cream | `oklch(0.985 0.012 70)` | Background |
| Terracotta | `oklch(0.633 0.18 38)` | Primary |
| Sage | `oklch(0.62 0.06 145)` | Secondary accent |
| Amber Glow | `oklch(0.78 0.15 75)` | Highlight |
| Cocoa | `oklch(0.28 0.025 50)` | Text / Dark |

---

## 📝 License

This project is for educational/demo purposes. The reference site [bd71shop.com.bd](https://bd71shop.com.bd) and its content belong to their respective owners.

---

## 🤝 Credits

- **Design & Development**: Built with care for pet lovers in Bangladesh 🇧🇩
- **Reference**: [BD71 Pet Shop](https://bd71shop.com.bd)
- **Icons**: [Lucide](https://lucide.dev)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Fonts**: [Fredoka](https://fonts.google.com/specimen/Fredoka) & [Quicksand](https://fonts.google.com/specimen/Quicksand)

---

<p align="center">Made with ❤️ for pets in Bangladesh 🐾</p>
