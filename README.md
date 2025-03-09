# AnimeXSchool 🎌

A modern e-commerce platform built with Next.js, featuring a seamless shopping experience for anime merchandise.

![Project Banner](public/Frame%201.png)

## ✨ Features

- 🛍️ Advanced shopping cart functionality
- 💳 Secure payment processing with Stripe
- 🔐 Authentication via Clerk
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔄 Real-time updates with server components
- 🛢️ PostgreSQL database with Drizzle ORM
- 🛒 WooCommerce integration with:
  - Product variations support
  - Dynamic pricing (regular/sale)
  - Category management
  - Rich product descriptions
  - Multiple product images
  - Custom attributes handling

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Authentication:** Clerk
- **Database:** PostgreSQL + Drizzle ORM
- **Payment:** Stripe
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Animation:** Framer Motion
- **E-commerce Backend:** WooCommerce

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/animexschool.git
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
bun install
\`\`\`

3. Configure environment variables:
\`\`\`env
# Database
DATABASE_URL=
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
# WooCommerce
WC_CONSUMER_KEY=
WC_CONSUMER_SECRET=
\`\`\`

4. Initialize the database:
\`\`\`bash
npm run push
\`\`\`

## 💻 Development

Start the development server with Turbopack:
\`\`\`bash
npm run dev
# or for turbo mode
npm run turbo
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (front)/           # Front-end routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            
│   ├── cart/             # Cart related components
│   ├── client/           # Client-side components
│   ├── common/           # Shared components
│   └── ui/               # UI components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
│   ├── db/              # Database configuration
│   └── types.ts         # TypeScript types
└── public/              # Static assets
\`\`\`

## 🛠️ Database Management

### Schema Structure

- **Users Table:**
  - User identification and authentication
  - Email and username tracking
  - Role-based access control
  
- **Roles Table:**
  - Role management system
  - User permission controls

- **Address Table:**
  - Multiple address support per user
  - Comprehensive location details
  - Shipping information management

- **Orders Table:**
  - Order tracking and management
  - JSON product data storage
  - Status tracking (default: pending)
  - Timestamp-based tracking
  - Total order value

### Database Operations
- **Schema Updates:** Edit `lib/db/schema.ts`
- **Push Changes:** `npm run push`
- **Studio Interface:** `npm run studio`
- **Relationships:**
  - Users → Roles (Many-to-One)
  - Users → Addresses (One-to-Many)
  - Orders → Users (Many-to-One)
  - Orders → Addresses (Many-to-One)

## 💳 Payment Integration

The project uses Stripe for payment processing:
- Webhook handling for payment events
- Secure checkout process
- Real-time order updates

## 🧪 Development Tools

- **Linting:** `npm run lint`
- **Type Checking:** Built-in TypeScript support
- **Database Studio:** `npm run studio`

## 🏪 Product System

The e-commerce system supports:
- **Product Types:** Both simple and variable products
- **Product Data:**
  - Regular and sale pricing
  - Short and full descriptions
  - Multiple product images
  - Custom attributes and variations
  - Category organization
  - Product slugs for SEO-friendly URLs
- **Variation System:**
  - Individual pricing per variation
  - Custom attribute combinations
  - Separate inventory management
- **Category Features:**
  - Hierarchical organization
  - Product counting
  - Category descriptions
  - SEO-friendly slugs

## 🌐 Deployment

The application can be deployed on Vercel:

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Start production server:
\`\`\`bash
npm run start
\`\`\`

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and TypeScript
