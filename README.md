# FashionX — Vue 3 E-Commerce SPA

A modern, fully responsive Single Page Application built with Vue 3, TypeScript, Vite, and Tailwind CSS. Products are fetched from the [DummyJSON](https://dummyjson.com) public API.

---

## 🚀 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Data Source:** DummyJSON REST API
- **Package Manager:** pnpm

---

## ✨ Features

### Core Features
- 🛍️ **Product Listing** — Fetches and displays products from DummyJSON API in a responsive grid
- 🔍 **Search** — Real-time product search using `computed()` and `v-model`
- 🗂️ **Category Filter** — Filter products by category using DummyJSON categories endpoint
- 📋 **Product Detail Modal** — Click any product to view full details in a popup modal

### Bonus Features
- 🛒 **Shopping Cart** — Global cart state using Pinia, persists across components
- 🌙 **Dark / Light Mode** — Toggle between themes using Tailwind's `dark:` modifier
- 🔐 **Authentication Simulation** — Login/Signup using DummyJSON `/user/login` endpoint with JWT token stored in `localStorage`
- 👤 **Profile Dropdown** — Shows user info and logout after login
- 📱 **Fully Responsive** — Mobile, Tablet, and Desktop layouts using Tailwind Grid/Flex

---

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.vue          # Navigation with search, cart, auth
│   ├── ProductCard.vue     # Individual product card
│   ├── FilterBar.vue       # Category filter buttons
│   ├── ProductModal.vue    # Product detail popup
│   ├── CartSidebar.vue     # Shopping cart sidebar
│   ├── LoginModal.vue      # Login/Signup modal
│   ├── FeatureSection.vue  # Why Choose Us section
│   └── Toast.vue           # Notification toasts
├── composables/
│   └── useTheme.ts         # Dark/Light mode composable
├── stores/
│   ├── cartStore.ts        # Pinia cart store
│   └── authStore.ts        # Pinia auth store
├── App.vue                 # Root component
├── main.ts                 # App entry point
├── style.css               # Tailwind imports
└── type.ts                 # TypeScript interfaces
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js `^20.19.0` or `>=22.12.0`
- pnpm `>=8.0.0`

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/vue-spa-project.git
cd vue-spa-project
```

**2. Install dependencies**
```bash
pnpm install
```

**3. Start development server**
```bash
pnpm dev
```

**4. Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

---

## 🔐 Test Credentials

Use these credentials to test the authentication feature:

| Field    | Value        |
|----------|--------------|
| Username | `emilys`     |
| Password | `emilyspass` |

---

## 📡 API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /products` | Fetch all products |
| `GET /products/categories` | Fetch all categories |
| `POST /user/login` | Authenticate user |
| `POST /users/add` | Register new user |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `luxury-black` | `#0F0F0F` | Page background |
| `luxury-surface` | `#1A1A1A` | Card background |
| `luxury-gold` | `#C9A84C` | Accents, buttons |
| `luxury-text` | `#F5F5F5` | Primary text |
| `luxury-muted` | `#9A9A9A` | Secondary text |