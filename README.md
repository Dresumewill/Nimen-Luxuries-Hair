# Nimen Luxuries

## Project Overview
- **Name**: Nimen Luxuries
- **Goal**: Premium luxury e-commerce website for a high-end hair brand selling 100% human hair and hair accessories globally
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages + TailwindCSS

## URLs
- **Live Preview**: https://3000-i40cq476fyx1ekgy0llm3-583b4d74.sandbox.novita.ai
- **Production**: To be deployed to Cloudflare Pages

## Features

### Completed Features
- **Homepage**: Stunning hero section, category browsing, featured products, video showcases, testimonials, Instagram feed
- **Shop Page**: Full product grid with filtering by category, texture, and sorting options
- **Product Detail Pages**: Complete with length/density variants, pricing, add-to-cart functionality
- **About Page**: Brand story, values, and community section
- **Hair Care Guide**: Comprehensive washing, styling, and storage tips
- **Contact Page**: Contact form and support information
- **FAQ Page**: Expandable questions about products, shipping, and returns
- **Shopping Cart**: Full cart functionality with quantity management
- **Checkout Page**: Complete checkout flow with shipping and payment form

### E-commerce Features
- Shopping cart with local storage persistence
- Product variants (length, density)
- Real-time cart updates
- Order summary with shipping calculations
- Free shipping on orders over $200
- Secure checkout form (Stripe-ready)

## Design Aesthetic
- **Background**: Deep charcoal (#1a1a1a)
- **Accents**: Champagne/gold (#d4af94)
- **Typography**: Cormorant Garamond (serif) + Montserrat (sans-serif)
- **Style**: Minimal, elegant, luxury fashion boutique

## Product Categories
1. **Wigs** - 30+ styles including curly, body wave, straight, deep wave, bouncy
2. **Bundles** - Raw human hair bundles
3. **Closures** - HD lace closures
4. **Frontals** - 13x4 and 13x6 lace frontals

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products (supports filters) |
| GET | `/api/products/:id` | Get single product details |

### Query Parameters for `/api/products`
- `category` - Filter by category (wigs, bundles, closures, frontals)
- `texture` - Filter by texture (straight, body-wave, deep-wave, curly, bouncy)
- `featured` - Filter featured products (true/false)
- `search` - Search products by name or description

## Pages & Routes
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/shop` | Shop/Collection |
| `/product/:id` | Product Detail |
| `/about` | About Us |
| `/hair-care` | Hair Care Guide |
| `/contact` | Contact Us |
| `/faq` | FAQ |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |

## Development

### Local Development
```bash
npm install
npm run build
npm run dev:sandbox
```

### Build
```bash
npm run build
```

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

## Deployment Status
- **Platform**: Cloudflare Pages (ready)
- **Status**: Development server running
- **Last Updated**: 2026-01-30

## Future Enhancements
- Stripe payment integration (production keys needed)
- User authentication and account management
- Order history and tracking
- Product reviews submission
- Wishlist functionality
- Email notifications
- Inventory management

## Data Models

### Product
```typescript
{
  id: string
  name: string
  category: 'wigs' | 'bundles' | 'closures' | 'frontals'
  texture: string
  color: string
  price: number
  originalPrice: number
  image: string
  description: string
  lengths: string[]
  densities: string[]
  featured: boolean
  rating: number
  reviews: number
}
```

### Cart Item
```typescript
{
  id: string
  name: string
  price: number
  image: string
  variant: string
  quantity: number
}
```

## User Guide

### Browsing Products
1. Visit the homepage to see featured products and categories
2. Click "Shop Collection" or category cards to browse
3. Use filters to narrow down by category, texture, or price

### Adding to Cart
1. Click on any product to view details
2. Select your desired length and density
3. Adjust quantity and click "Add to Bag"
4. View cart by clicking the bag icon

### Checkout
1. Go to cart and click "Proceed to Checkout"
2. Fill in contact and shipping information
3. Enter payment details
4. Click "Complete Order" to place order

---

**Nimen Luxuries** - *Luxury Hair Crafted for Elegance*
