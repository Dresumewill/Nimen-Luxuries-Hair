import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { cors } from 'hono/cors'

// Product interface
interface Product {
  id: string
  name: string
  category: string
  texture?: string
  color?: string
  price: number
  originalPrice: number
  image: string
  description: string
  lengths?: string[]
  densities?: string[]
  featured: boolean
  rating: number
  reviews: number
}

// Product data with all provided images
const products: Product[] = [
  {
    id: 'curly-brown-1',
    name: 'Chocolate Curly Lace Front',
    category: 'wigs',
    texture: 'curly',
    color: 'Brown',
    price: 289,
    originalPrice: 350,
    image: '/static/images/1bep1ySR.jpg',
    description: 'Deep brown curly lace front wig with natural hairline. Premium 100% human hair.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    densities: ['130%', '150%', '180%', '200%'],
    featured: true,
    rating: 4.9,
    reviews: 127
  },
  {
    id: 'body-wave-ombre',
    name: 'Ombré Body Wave Wig',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Ombré Black/Brown',
    price: 329,
    originalPrice: 420,
    image: '/static/images/aLrRVkvZ.jpg',
    description: 'Stunning ombré body wave with dark roots fading to chocolate brown.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    densities: ['130%', '150%', '180%', '200%'],
    featured: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'long-body-wave',
    name: 'Luxury Body Wave Long',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Natural Black',
    price: 399,
    originalPrice: 480,
    image: '/static/images/FDwIdagT.jpg',
    description: 'Ultra-long body wave wig with incredible volume. Perfect for special occasions.',
    lengths: ['20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    densities: ['150%', '180%', '200%', '250%'],
    featured: true,
    rating: 5.0,
    reviews: 156
  },
  {
    id: 'bouncy-curly-bob',
    name: 'Bouncy Curly Bob',
    category: 'wigs',
    texture: 'curly',
    color: 'Natural Black',
    price: 249,
    originalPrice: 299,
    image: '/static/images/hgPmTYKi.jpg',
    description: 'Gorgeous bouncy curly bob with bangs. Fun, flirty, and fabulous.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%', '200%'],
    featured: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: 'straight-brown-bundles',
    name: 'Raw Straight Bundles',
    category: 'bundles',
    texture: 'straight',
    color: 'Brown',
    price: 189,
    originalPrice: 230,
    image: '/static/images/dtp8tOCk.jpg',
    description: 'Premium raw Vietnamese straight hair bundles with closure.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['Standard'],
    featured: false,
    rating: 4.7,
    reviews: 78
  },
  {
    id: 'bouncy-highlight-bundles',
    name: 'Highlight Bouncy Bundles',
    category: 'bundles',
    texture: 'bouncy',
    color: 'Highlight Brown/Blonde',
    price: 229,
    originalPrice: 280,
    image: '/static/images/NAUxzYT0.jpg',
    description: 'Beautiful highlighted bouncy bundles with frontal.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"'],
    densities: ['Standard'],
    featured: false,
    rating: 4.8,
    reviews: 65
  },
  {
    id: 'highlight-body-wave',
    name: 'Highlighted Body Wave Wig',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Highlight Brown/Blonde',
    price: 359,
    originalPrice: 430,
    image: '/static/images/s3thTl7P.jpg',
    description: 'Glamorous highlighted body wave with dimensional color.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    densities: ['150%', '180%', '200%'],
    featured: true,
    rating: 4.9,
    reviews: 112
  },
  {
    id: 'deep-wave-long',
    name: 'Deep Wave Lace Front',
    category: 'wigs',
    texture: 'deep-wave',
    color: 'Natural Black',
    price: 319,
    originalPrice: 389,
    image: '/static/images/eSF8KsnG.jpg',
    description: 'Luxurious deep wave pattern. Available 12-28 inches.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    densities: ['130%', '150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 94
  },
  {
    id: 'auburn-curly',
    name: 'Auburn Curly Wig',
    category: 'wigs',
    texture: 'curly',
    color: 'Auburn',
    price: 299,
    originalPrice: 360,
    image: '/static/images/RBGHG7xs.jpg',
    description: 'Rich auburn curly wig with gorgeous copper tones.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 'deep-wave-bundles',
    name: 'Deep Wave Raw Bundles',
    category: 'bundles',
    texture: 'deep-wave',
    color: 'Natural Black',
    price: 169,
    originalPrice: 210,
    image: '/static/images/3sdVXCeW.jpg',
    description: 'Raw deep wave bundles with frontal. Premium Vietnamese hair.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    densities: ['Standard'],
    featured: false,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'grey-bob',
    name: 'Platinum Grey Bob',
    category: 'wigs',
    texture: 'straight',
    color: 'Grey',
    price: 269,
    originalPrice: 320,
    image: '/static/images/ImNzHQdO.jpg',
    description: 'Chic 5x5 grey color bob wig. Bold, modern, and sophisticated.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: true,
    rating: 4.9,
    reviews: 145
  },
  {
    id: 'curly-bangs',
    name: 'Curly Lace with Bangs',
    category: 'wigs',
    texture: 'curly',
    color: 'Natural Black',
    price: 259,
    originalPrice: 310,
    image: '/static/images/R6hnhNpZ.jpg',
    description: 'Adorable curly wig with natural bangs.',
    lengths: ['12"', '14"', '16"', '18"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.6,
    reviews: 58
  },
  {
    id: 'grey-body-wave',
    name: 'Silver Grey Body Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Silver Grey',
    price: 339,
    originalPrice: 410,
    image: '/static/images/2SF9zfac.jpg',
    description: 'Stunning silver grey body wave. Elegant and fashion-forward.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 76
  },
  {
    id: 'burgundy-wave',
    name: 'Burgundy Body Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Burgundy',
    price: 329,
    originalPrice: 399,
    image: '/static/images/72KVO0fo.jpg',
    description: 'Rich burgundy body wave with deep wine tones.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    densities: ['150%', '180%', '200%'],
    featured: true,
    rating: 4.9,
    reviews: 134
  },
  {
    id: 'ginger-wave',
    name: 'Ginger Body Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Ginger',
    price: 319,
    originalPrice: 380,
    image: '/static/images/sENTKw6g.jpg',
    description: 'Vibrant ginger body wave wig. Warm, fiery, and stunning.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.7,
    reviews: 87
  },
  {
    id: 'purple-wave',
    name: 'Plum Purple Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Purple',
    price: 309,
    originalPrice: 370,
    image: '/static/images/ZP4M8g5K.jpg',
    description: 'Deep plum purple body wave. Mysterious and alluring.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 63
  },
  {
    id: 'grey-pixie',
    name: 'Silver Pixie Cut',
    category: 'wigs',
    texture: 'straight',
    color: 'Silver Grey',
    price: 199,
    originalPrice: 240,
    image: '/static/images/yhbw7G2p.jpg',
    description: 'Elegant silver pixie cut wig. Short, chic, and sophisticated.',
    lengths: ['6"', '8"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.9,
    reviews: 112
  },
  {
    id: 'vietnamese-bounce',
    name: 'Raw Vietnamese Bounce',
    category: 'wigs',
    texture: 'bouncy',
    color: 'Dark Brown',
    price: 379,
    originalPrice: 450,
    image: '/static/images/HddFOqAy.jpg',
    description: 'Premium raw Vietnamese bouncy hair. Voluminous and glamorous.',
    lengths: ['16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    densities: ['180%', '200%', '250%'],
    featured: true,
    rating: 5.0,
    reviews: 189
  },
  {
    id: 'body-wave-natural',
    name: 'Natural Body Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Natural Black',
    price: 289,
    originalPrice: 350,
    image: '/static/images/5KndcSLd.jpg',
    description: 'Classic natural black body wave. Timeless elegance.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    densities: ['130%', '150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'honey-highlight',
    name: 'Honey Highlight Curls',
    category: 'wigs',
    texture: 'curly',
    color: 'Honey Highlight',
    price: 339,
    originalPrice: 410,
    image: '/static/images/q8lStKao.jpg',
    description: 'Gorgeous honey highlighted curls. Dimensional and sun-kissed.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.9,
    reviews: 98
  },
  {
    id: 'deep-wave-closure',
    name: 'Deep Wave with Closure',
    category: 'closures',
    texture: 'deep-wave',
    color: 'Natural Black',
    price: 149,
    originalPrice: 180,
    image: '/static/images/0zL8uSrk.jpg',
    description: 'Premium deep wave bundles with 4x4 lace closure.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"'],
    densities: ['Standard'],
    featured: false,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 'burgundy-curly',
    name: 'Burgundy Curly Wig',
    category: 'wigs',
    texture: 'curly',
    color: 'Burgundy',
    price: 299,
    originalPrice: 360,
    image: '/static/images/Pjc9mClO.jpg',
    description: 'Deep burgundy curly wig. Rich wine color.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 74
  },
  {
    id: 'chocolate-curly',
    name: 'Chocolate Curly',
    category: 'wigs',
    texture: 'curly',
    color: 'Chocolate Brown',
    price: 279,
    originalPrice: 340,
    image: '/static/images/rDq0PXPl.jpg',
    description: 'Delicious chocolate brown curly wig. Natural and beautiful.',
    lengths: ['12"', '14"', '16"', '18"', '20"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.9,
    reviews: 103
  },
  {
    id: 'ombre-bob',
    name: 'Ombré Bouncy Bob',
    category: 'wigs',
    texture: 'bouncy',
    color: 'Ombré Brown',
    price: 259,
    originalPrice: 310,
    image: '/static/images/4IQAs4mu.jpg',
    description: 'Stylish ombré bouncy bob. Short, sassy, and sophisticated.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'burgundy-afro',
    name: 'Burgundy Afro Curly',
    category: 'wigs',
    texture: 'curly',
    color: 'Burgundy',
    price: 239,
    originalPrice: 290,
    image: '/static/images/c95uDjnc.jpg',
    description: 'Bold burgundy afro curly wig. Voluminous and expressive.',
    lengths: ['12"', '14"', '16"'],
    densities: ['180%', '200%'],
    featured: false,
    rating: 4.7,
    reviews: 56
  },
  {
    id: 'jerry-curl-long',
    name: 'Long Jerry Curl',
    category: 'wigs',
    texture: 'curly',
    color: 'Natural Black',
    price: 329,
    originalPrice: 399,
    image: '/static/images/LNnRl3Hs.jpg',
    description: 'Luxurious long jerry curl wig. Defined curls.',
    lengths: ['18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.9,
    reviews: 121
  },
  {
    id: 'body-wave-closure',
    name: 'Body Wave with Frontal',
    category: 'frontals',
    texture: 'body-wave',
    color: 'Natural Black',
    price: 179,
    originalPrice: 220,
    image: '/static/images/m1r8JzfT.jpg',
    description: 'Classic body wave bundles with 13x4 lace frontal.',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['Standard'],
    featured: false,
    rating: 4.8,
    reviews: 134
  },
  {
    id: 'orange-bob',
    name: 'Vibrant Orange Bob',
    category: 'wigs',
    texture: 'straight',
    color: 'Orange',
    price: 249,
    originalPrice: 299,
    image: '/static/images/UPUBE2hq.jpg',
    description: 'Bold and vibrant orange bob wig.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.6,
    reviews: 45
  },
  {
    id: 'caramel-bounce',
    name: 'Caramel Ombré Bounce',
    category: 'wigs',
    texture: 'bouncy',
    color: 'Caramel Ombré',
    price: 319,
    originalPrice: 380,
    image: '/static/images/71fkn8Bu.jpg',
    description: 'Gorgeous caramel ombré bouncy wig. Warm and inviting.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"'],
    densities: ['150%', '180%', '200%'],
    featured: true,
    rating: 4.9,
    reviews: 167
  },
  {
    id: 'burgundy-straight',
    name: 'Burgundy Straight Silk',
    category: 'wigs',
    texture: 'straight',
    color: 'Burgundy',
    price: 289,
    originalPrice: 350,
    image: '/static/images/xPDlgaIN.jpg',
    description: 'Sleek burgundy straight wig. Silky, shiny.',
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    densities: ['130%', '150%', '180%'],
    featured: false,
    rating: 4.8,
    reviews: 87
  },
  {
    id: 'brown-bob-straight',
    name: 'Chocolate Straight Bob',
    category: 'wigs',
    texture: 'straight',
    color: 'Chocolate Brown',
    price: 229,
    originalPrice: 280,
    image: '/static/images/2y8qyXBz.jpg',
    description: 'Classic chocolate brown straight bob.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.7,
    reviews: 76
  },
  {
    id: 'ombre-bouncy-orange',
    name: 'Ombré Copper Bounce',
    category: 'wigs',
    texture: 'bouncy',
    color: 'Ombré Copper',
    price: 309,
    originalPrice: 370,
    image: '/static/images/7rzL2WIq.jpg',
    description: 'Beautiful ombré copper bouncy wig.',
    lengths: ['12"', '14"', '16"', '18"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.8,
    reviews: 62
  },
  {
    id: 'auburn-retro',
    name: 'Auburn Vintage Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Auburn',
    price: 279,
    originalPrice: 340,
    image: '/static/images/jtaW8WaY.jpg',
    description: 'Retro-inspired auburn wave bob. Old Hollywood glamour.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.9,
    reviews: 98
  },
  {
    id: 'jerry-curl-duo',
    name: 'Jerry Curl Classic',
    category: 'wigs',
    texture: 'curly',
    color: 'Natural Black',
    price: 309,
    originalPrice: 370,
    image: '/static/images/NosQuE2Q.jpg',
    description: 'Classic jerry curl with perfect definition.',
    lengths: ['16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.8,
    reviews: 143
  },
  {
    id: 'brown-bob-sleek',
    name: 'Brown Sleek Bob',
    category: 'wigs',
    texture: 'straight',
    color: 'Brown',
    price: 219,
    originalPrice: 260,
    image: '/static/images/4JCE7Cwu.jpg',
    description: 'Perfectly sleek brown bob. Professional and polished.',
    lengths: ['10"', '12"', '14"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'ombre-auburn-wave',
    name: 'Ombré Auburn Wave',
    category: 'wigs',
    texture: 'body-wave',
    color: 'Ombré Auburn',
    price: 329,
    originalPrice: 399,
    image: '/static/images/GkSbIFNo.jpg',
    description: 'Stunning ombré auburn body wave.',
    lengths: ['14"', '16"', '18"', '20"', '22"'],
    densities: ['150%', '180%', '200%'],
    featured: false,
    rating: 4.9,
    reviews: 108
  },
  {
    id: 'honey-curly-bob',
    name: 'Honey Blonde Curly Bob',
    category: 'wigs',
    texture: 'curly',
    color: 'Honey Blonde',
    price: 269,
    originalPrice: 320,
    image: '/static/images/bhov5AOQ.jpg',
    description: 'Sweet honey blonde curly bob. Fun and flirty.',
    lengths: ['10"', '12"', '14"', '16"'],
    densities: ['150%', '180%'],
    featured: false,
    rating: 4.8,
    reviews: 95
  }
]

const app = new Hono()

app.use('*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// Serve SEO files from root
app.get('/robots.txt', (c) => {
  return c.text(`# Robots.txt for Nimen Luxuries
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://nimenluxuries.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`)
})

app.get('/sitemap.xml', (c) => {
  c.header('Content-Type', 'application/xml')
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nimenluxuries.com/</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nimenluxuries.com/shop</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nimenluxuries.com/about</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nimenluxuries.com/hair-care</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nimenluxuries.com/contact</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://nimenluxuries.com/faq</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`)
})

// API Routes
app.get('/api/products', (c) => {
  const category = c.req.query('category')
  const texture = c.req.query('texture')
  const featured = c.req.query('featured')
  const search = c.req.query('search')
  
  let filtered = [...products]
  
  if (category) filtered = filtered.filter(p => p.category === category)
  if (texture) filtered = filtered.filter(p => p.texture === texture)
  if (featured === 'true') filtered = filtered.filter(p => p.featured)
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }
  
  return c.json({ products: filtered, total: filtered.length })
})

app.get('/api/products/:id', (c) => {
  const id = c.req.param('id')
  const product = products.find(p => p.id === id)
  if (!product) return c.json({ error: 'Product not found' }, 404)
  return c.json({ product })
})

// Helper function to generate product card HTML
const productCard = (p: Product) => `
  <a href="/product/${p.id}" class="product-card group">
    <div class="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 mb-4">
      <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" loading="lazy" width="300" height="400" decoding="async">
      ${p.originalPrice > p.price ? '<div class="absolute top-3 left-3 bg-rose-gold text-cream text-xs px-2 py-1 rounded">SALE</div>' : ''}
      <div class="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="btn-primary px-6 py-2 rounded text-xs font-medium tracking-wider">QUICK VIEW</span>
      </div>
    </div>
    <h3 class="text-cream font-medium text-sm mb-1 group-hover:text-champagne transition-colors">${p.name}</h3>
    <div class="flex items-center gap-2">
      <span class="text-champagne font-serif text-lg">$${p.price}</span>
      ${p.originalPrice > p.price ? `<span class="text-cream/40 text-sm line-through">$${p.originalPrice}</span>` : ''}
    </div>
    <div class="flex items-center gap-1 mt-2">
      <div class="flex text-champagne text-xs">★★★★★</div>
      <span class="text-cream/40 text-xs">(${p.reviews})</span>
    </div>
  </a>
`

// Base layout function
const baseLayout = (title: string, content: string, scripts: string = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Nimen Luxuries</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Luxury hair beyond compare. From roots to tips, perfection never slips. Premium human hair wigs, bundles, closures and frontals.">
    <meta name="keywords" content="luxury hair, human hair wigs, hair bundles, lace closures, lace frontals, premium wigs, hair extensions">
    <meta name="author" content="Nimen Luxuries">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://nimenluxuries.com/">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title} | Nimen Luxuries">
    <meta property="og:description" content="Luxury hair beyond compare. Premium human hair wigs, bundles, closures and frontals.">
    <meta property="og:image" content="/static/images/logo-3d.png">
    <meta property="og:url" content="https://nimenluxuries.com/">
    <meta property="og:site_name" content="Nimen Luxuries">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | Nimen Luxuries">
    <meta name="twitter:description" content="Luxury hair beyond compare. Premium human hair wigs, bundles, closures and frontals.">
    <meta name="twitter:image" content="/static/images/logo-3d.png">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="/static/images/logo-transparent.png">
    <link rel="apple-touch-icon" href="/static/images/logo-transparent.png">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#2d1f3d">
    <meta name="msapplication-TileColor" content="#2d1f3d">
    
    <!-- Preconnect for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    
    <!-- Preload Critical Assets -->
    <link rel="preload" href="/static/images/logo-transparent.png" as="image">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap" as="style">
    
    <!-- Fonts with display=swap for performance -->
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Font Awesome - defer non-critical -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'">
    <noscript><link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"></noscript>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              charcoal: '#2d1f3d',
              'charcoal-light': '#3d2d52',
              champagne: '#e8a4c4',
              'champagne-light': '#f5c6d6',
              'champagne-dark': '#c77daa',
              nude: '#f0d4e8',
              'rose-gold': '#d4649a',
              cream: '#fff5fa',
              pink: '#ff85b3',
              'pink-light': '#ffb3d1',
              'pink-dark': '#e066a0',
              purple: '#9b59b6',
              'purple-light': '#bb8fce',
              'purple-dark': '#7d3c98',
            },
            fontFamily: {
              serif: ['Cormorant Garamond', 'serif'],
              sans: ['Montserrat', 'sans-serif'],
            }
          }
        }
      }
    </script>
    
    <!-- Critical CSS Inlined -->
    <style>
      /* Critical styles for above-the-fold content */
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
      body{font-family:'Montserrat',sans-serif;background:linear-gradient(135deg,#2d1f3d 0%,#4a2c5a 25%,#5d3a6e 50%,#3d2d52 75%,#2d1f3d 100%);background-attachment:fixed;color:#fff5fa;min-height:100vh;line-height:1.5}
      img,video{max-width:100%;height:auto;display:block}
      a{color:inherit;text-decoration:none}
      button{cursor:pointer;border:none;background:none;font-family:inherit}
      
      /* Font classes */
      .font-serif{font-family:'Cormorant Garamond',serif}
      
      /* Animation classes */
      .product-card:hover img{transform:scale(1.05)}
      .product-card img{transition:transform 0.5s ease}
      .gold-gradient{background:linear-gradient(135deg,#ff85b3 0%,#9b59b6 50%,#ff85b3 100%)}
      .pink-purple-gradient{background:linear-gradient(135deg,#ff85b3 0%,#e066a0 25%,#9b59b6 75%,#7d3c98 100%)}
      .text-gradient{background:linear-gradient(135deg,#ff85b3 0%,#ffb3d1 25%,#bb8fce 50%,#9b59b6 75%,#ff85b3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      
      /* Navigation styles */
      .nav-link{position:relative}
      .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:linear-gradient(90deg,#ff85b3,#9b59b6);transition:width 0.3s ease}
      .nav-link:hover::after{width:100%}
      
      /* Button styles */
      .btn-primary{background:linear-gradient(135deg,#ff85b3 0%,#e066a0 50%,#9b59b6 100%);color:#fff;transition:all 0.3s ease}
      .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,133,179,0.4)}
      .btn-secondary{border:1px solid #ff85b3;color:#ff85b3;transition:all 0.3s ease}
      .btn-secondary:hover{background:linear-gradient(135deg,#ff85b3,#9b59b6);color:#fff;border-color:transparent}
      
      /* Focus states for accessibility */
      a:focus,button:focus,input:focus,select:focus,textarea:focus{outline:2px solid #ff85b3;outline-offset:2px}
      input:focus,select:focus,textarea:focus{box-shadow:0 0 10px rgba(255,133,179,0.3)}
      
      /* Skip link for accessibility */
      .skip-link{position:absolute;top:-40px;left:0;background:#ff85b3;color:#2d1f3d;padding:8px 16px;z-index:100;transition:top 0.3s}
      .skip-link:focus{top:0}
      
      /* Scrollbar */
      ::-webkit-scrollbar{width:8px}
      ::-webkit-scrollbar-track{background:#2d1f3d}
      ::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#ff85b3,#9b59b6);border-radius:4px}
      
      /* Animations */
      .animate-fade-in{animation:fadeIn 0.6s ease forwards}
      @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      
      /* Reduced motion preference */
      @media(prefers-reduced-motion:reduce){
        *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
      }
    </style>
    
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Nimen Luxuries",
      "url": "https://nimenluxuries.com",
      "logo": "https://nimenluxuries.com/static/images/logo-3d.png",
      "description": "Premium human hair wigs, bundles, closures and frontals",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-NIMEN",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://instagram.com/nimenluxuries",
        "https://tiktok.com/@nimenluxuries",
        "https://facebook.com/nimenluxuries"
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Nimen Luxuries",
      "url": "https://nimenluxuries.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://nimenluxuries.com/shop?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
</head>
<body class="min-h-screen flex flex-col">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Navigation -->
    <header role="banner">
      <nav class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-dark/95 via-charcoal/95 to-pink-dark/95 backdrop-blur-sm border-b border-pink/20" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <a href="/" class="flex items-center space-x-2" aria-label="Nimen Luxuries Home">
                    <img src="/static/images/logo-transparent.png" alt="" class="h-12 w-auto" width="48" height="48" loading="eager">
                    <img src="/static/images/logo-3d.png" alt="Nimen Luxuries" class="h-10 w-auto hidden sm:block" width="180" height="40" loading="eager">
                </a>
                <div class="hidden md:flex items-center space-x-8" role="menubar">
                    <a href="/" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">HOME</a>
                    <a href="/shop" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">SHOP</a>
                    <a href="/about" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">ABOUT</a>
                    <a href="/hair-care" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">HAIR CARE</a>
                    <a href="/contact" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">CONTACT</a>
                    <a href="/faq" class="nav-link text-sm tracking-wider text-cream/80 hover:text-champagne" role="menuitem">FAQ</a>
                </div>
                <div class="flex items-center space-x-6">
                    <button type="button" onclick="openSearch()" class="text-cream/80 hover:text-champagne transition-colors" aria-label="Open search"><span class="fas fa-search text-lg" aria-hidden="true"></span></button>
                    <a href="/cart" class="text-cream/80 hover:text-champagne transition-colors relative" aria-label="Shopping cart">
                        <span class="fas fa-shopping-bag text-lg" aria-hidden="true"></span>
                        <span id="cart-count" class="absolute -top-2 -right-2 bg-champagne text-charcoal text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium hidden" aria-live="polite">0</span>
                    </a>
                    <button type="button" onclick="toggleMobileMenu()" class="md:hidden text-cream/80 hover:text-champagne" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu"><span class="fas fa-bars text-xl" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-gradient-to-b from-purple-dark/95 to-charcoal/95 border-t border-pink/20" role="menu" aria-label="Mobile navigation">
            <div class="px-4 py-6 space-y-4">
                <a href="/" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">HOME</a>
                <a href="/shop" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">SHOP</a>
                <a href="/about" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">ABOUT</a>
                <a href="/hair-care" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">HAIR CARE</a>
                <a href="/contact" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">CONTACT</a>
                <a href="/faq" class="block text-sm tracking-wider text-cream/80 hover:text-champagne py-2" role="menuitem">FAQ</a>
            </div>
        </div>
      </nav>
    </header>
    
    <!-- Search Modal -->
    <div id="search-modal" class="hidden fixed inset-0 z-[60] bg-gradient-to-br from-purple-dark/95 via-charcoal/95 to-pink-dark/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search products">
        <div class="max-w-3xl mx-auto px-4 pt-32">
            <div class="flex items-center justify-between mb-8">
                <h2 class="font-serif text-3xl text-champagne" id="search-title">Search</h2>
                <button type="button" onclick="closeSearch()" class="text-cream/60 hover:text-champagne" aria-label="Close search"><span class="fas fa-times text-2xl" aria-hidden="true"></span></button>
            </div>
            <div class="relative">
                <label for="search-input" class="sr-only">Search for products</label>
                <input type="search" id="search-input" placeholder="Search for wigs, bundles..." class="w-full bg-transparent border-b-2 border-pink/40 focus:border-champagne text-cream text-lg py-4 pr-12 placeholder-cream/40" aria-describedby="search-title">
                <span class="fas fa-search absolute right-0 top-1/2 -translate-y-1/2 text-pink/70" aria-hidden="true"></span>
            </div>
            <div id="search-results" class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4" role="region" aria-live="polite" aria-label="Search results"></div>
        </div>
    </div>
    
    <main id="main-content" class="flex-1 pt-20" role="main">${content}</main>
    
    <!-- Footer -->
    <footer class="bg-gradient-to-r from-purple-dark/80 via-charcoal to-pink-dark/80 border-t border-pink/20 mt-20" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="md:col-span-1">
                    <div class="flex items-center space-x-3 mb-6">
                      <img src="/static/images/logo-transparent.png" alt="" class="h-16 w-auto" width="64" height="64" loading="lazy">
                      <img src="/static/images/logo-3d.png" alt="Nimen Luxuries" class="h-12 w-auto" width="180" height="48" loading="lazy">
                    </div>
                    <p class="text-cream/60 text-sm leading-relaxed">From roots to tips, perfection never slips.<br>Premium hair that shows you care.</p>
                    <div class="flex space-x-4 mt-6" role="list" aria-label="Social media links">
                        <a href="https://instagram.com/nimenluxuries" class="text-cream/60 hover:text-champagne transition-colors" aria-label="Follow us on Instagram" rel="noopener noreferrer" target="_blank"><span class="fab fa-instagram text-xl" aria-hidden="true"></span></a>
                        <a href="https://tiktok.com/@nimenluxuries" class="text-cream/60 hover:text-champagne transition-colors" aria-label="Follow us on TikTok" rel="noopener noreferrer" target="_blank"><span class="fab fa-tiktok text-xl" aria-hidden="true"></span></a>
                        <a href="https://facebook.com/nimenluxuries" class="text-cream/60 hover:text-champagne transition-colors" aria-label="Follow us on Facebook" rel="noopener noreferrer" target="_blank"><span class="fab fa-facebook text-xl" aria-hidden="true"></span></a>
                    </div>
                </div>
                <nav aria-label="Shop categories">
                    <h4 class="font-serif text-xl text-champagne mb-6">Shop</h4>
                    <ul class="space-y-3" role="list">
                        <li><a href="/shop?category=wigs" class="text-cream/60 hover:text-champagne text-sm transition-colors">Wigs</a></li>
                        <li><a href="/shop?category=bundles" class="text-cream/60 hover:text-champagne text-sm transition-colors">Bundles</a></li>
                        <li><a href="/shop?category=closures" class="text-cream/60 hover:text-champagne text-sm transition-colors">Closures</a></li>
                        <li><a href="/shop?category=frontals" class="text-cream/60 hover:text-champagne text-sm transition-colors">Frontals</a></li>
                    </ul>
                </nav>
                <nav aria-label="Customer support">
                    <h4 class="font-serif text-xl text-champagne mb-6">Customer Care</h4>
                    <ul class="space-y-3" role="list">
                        <li><a href="/contact" class="text-cream/60 hover:text-champagne text-sm transition-colors">Contact Us</a></li>
                        <li><a href="/faq" class="text-cream/60 hover:text-champagne text-sm transition-colors">FAQ</a></li>
                        <li><a href="/hair-care" class="text-cream/60 hover:text-champagne text-sm transition-colors">Hair Care Guide</a></li>
                    </ul>
                </nav>
                <div>
                    <h4 class="font-serif text-xl text-champagne mb-6" id="newsletter-heading">Newsletter</h4>
                    <p class="text-cream/60 text-sm mb-4">Subscribe for exclusive offers.</p>
                    <form class="space-y-3" aria-labelledby="newsletter-heading" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
                        <label for="newsletter-email" class="sr-only">Email address</label>
                        <input type="email" id="newsletter-email" name="email" placeholder="Your email" required autocomplete="email" class="w-full bg-charcoal border border-pink/40 rounded px-4 py-3 text-cream text-sm placeholder-cream/40">
                        <button type="submit" class="btn-primary w-full py-3 rounded text-sm font-medium tracking-wider">SUBSCRIBE</button>
                    </form>
                </div>
            </div>
            <div class="border-t border-pink/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
                <p class="text-cream/40 text-xs">© 2026 Nimen Luxuries. All rights reserved.</p>
                <div class="flex items-center space-x-4 mt-4 md:mt-0" role="img" aria-label="We accept Visa, Mastercard, American Express, and PayPal">
                    <span class="fab fa-cc-visa text-2xl text-cream/40" aria-hidden="true"></span>
                    <span class="fab fa-cc-mastercard text-2xl text-cream/40" aria-hidden="true"></span>
                    <span class="fab fa-cc-amex text-2xl text-cream/40" aria-hidden="true"></span>
                    <span class="fab fa-cc-paypal text-2xl text-cream/40" aria-hidden="true"></span>
                </div>
            </div>
        </div>
    </footer>
    
    <script>
      let cart = JSON.parse(localStorage.getItem('nimen-cart') || '[]');
      function updateCartUI() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const countEl = document.getElementById('cart-count');
        if (count > 0) { countEl.textContent = count; countEl.classList.remove('hidden'); } 
        else { countEl.classList.add('hidden'); }
      }
      function addToCart(product, variant = '') {
        const existingIndex = cart.findIndex(item => item.id === product.id && item.variant === variant);
        if (existingIndex >= 0) { cart[existingIndex].quantity++; } 
        else { cart.push({ ...product, variant, quantity: 1 }); }
        localStorage.setItem('nimen-cart', JSON.stringify(cart));
        updateCartUI();
        alert('Added to bag!');
      }
      function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('nimen-cart', JSON.stringify(cart));
        updateCartUI();
        if (typeof renderCartPage === 'function') renderCartPage();
      }
      function updateQuantity(id, delta) {
        const item = cart.find(item => item.id === id);
        if (item) {
          item.quantity += delta;
          if (item.quantity <= 0) removeFromCart(id);
          else { localStorage.setItem('nimen-cart', JSON.stringify(cart)); updateCartUI(); }
        }
      }
      function openSearch() { document.getElementById('search-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; document.getElementById('search-input').focus(); }
      function closeSearch() { document.getElementById('search-modal').classList.add('hidden'); document.body.style.overflow = ''; }
      function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('hidden'); }
      document.getElementById('search-input')?.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length < 2) { document.getElementById('search-results').innerHTML = ''; return; }
        const res = await fetch('/api/products?search=' + encodeURIComponent(query));
        const data = await res.json();
        document.getElementById('search-results').innerHTML = data.products.slice(0, 6).map(p => 
          '<a href="/product/' + p.id + '" class="block bg-charcoal rounded-lg overflow-hidden hover:ring-1 ring-pink/40"><img src="' + p.image + '" alt="' + p.name + '" class="w-full aspect-[3/4] object-cover" loading="lazy" width="300" height="400" decoding="async"><div class="p-3"><h4 class="text-cream text-sm truncate">' + p.name + '</h4><p class="text-champagne font-medium">$' + p.price + '</p></div></a>'
        ).join('');
      });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
      updateCartUI();
    </script>
    ${scripts}
</body>
</html>
`

// Homepage
app.get('/', (c) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8)
  
  const content = `
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-b from-purple-dark/80 via-charcoal/60 to-pink-dark/40 z-10"></div>
        <img src="/static/images/HddFOqAy.jpg" alt="Model with luxury human hair wig showcasing premium quality" class="w-full h-full object-cover object-top" width="1200" height="800" loading="eager" fetchpriority="high">
      </div>
      <div class="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 animate-fade-in">
          Luxury Hair<br><span class="text-gradient">Beyond Compare</span>
        </h1>
        <p class="text-cream/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.2s">
          From roots to tips, perfection never slips.<br>Premium hair that shows you care.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style="animation-delay: 0.4s">
          <a href="/shop" class="btn-primary px-10 py-4 rounded text-sm font-medium tracking-wider">SHOP COLLECTION</a>
          <a href="/about" class="btn-secondary px-10 py-4 rounded text-sm font-medium tracking-wider">OUR STORY</a>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <i class="fas fa-chevron-down text-pink/70 text-2xl"></i>
      </div>
    </section>
    
    <!-- Categories -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl text-gradient mb-4">Shop by Category</h2>
          <p class="text-cream/60 max-w-xl mx-auto">Discover our curated collection of premium human hair products</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <a href="/shop?category=wigs" class="group relative aspect-[3/4] overflow-hidden rounded-lg">
            <img src="/static/images/72KVO0fo.jpg" alt="Collection of premium human hair wigs" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="533" decoding="async">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="font-serif text-2xl md:text-3xl text-cream mb-1">Wigs</h3>
              <p class="text-champagne text-sm">30+ Styles</p>
            </div>
          </a>
          <a href="/shop?category=bundles" class="group relative aspect-[3/4] overflow-hidden rounded-lg">
            <img src="/static/images/dtp8tOCk.jpg" alt="Premium raw hair bundles collection" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="533" decoding="async">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="font-serif text-2xl md:text-3xl text-cream mb-1">Bundles</h3>
              <p class="text-champagne text-sm">Raw Hair</p>
            </div>
          </a>
          <a href="/shop?category=closures" class="group relative aspect-[3/4] overflow-hidden rounded-lg">
            <img src="/static/images/0zL8uSrk.jpg" alt="HD lace closures for natural look" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="533" decoding="async">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="font-serif text-2xl md:text-3xl text-cream mb-1">Closures</h3>
              <p class="text-champagne text-sm">HD Lace</p>
            </div>
          </a>
          <a href="/shop?category=frontals" class="group relative aspect-[3/4] overflow-hidden rounded-lg">
            <img src="/static/images/m1r8JzfT.jpg" alt="Lace frontals for seamless hairline" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="533" decoding="async">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="font-serif text-2xl md:text-3xl text-cream mb-1">Frontals</h3>
              <p class="text-champagne text-sm">13x4 & 13x6</p>
            </div>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-20 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 class="font-serif text-4xl md:text-5xl text-gradient mb-2">Bestsellers</h2>
            <p class="text-cream/60">Our most loved styles</p>
          </div>
          <a href="/shop" class="btn-secondary px-8 py-3 rounded text-sm font-medium tracking-wider mt-6 md:mt-0">VIEW ALL</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          ${featuredProducts.map(productCard).join('')}
        </div>
      </div>
    </section>
    
    <!-- Brand Promise -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div class="text-center p-8 border border-champagne/20 rounded-lg">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
              <i class="fas fa-gem text-charcoal text-2xl"></i>
            </div>
            <h3 class="font-serif text-2xl text-champagne mb-3">100% Human Hair</h3>
            <p class="text-cream/60 text-sm leading-relaxed">Premium quality raw and virgin hair sourced ethically from trusted suppliers worldwide.</p>
          </div>
          <div class="text-center p-8 border border-champagne/20 rounded-lg">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
              <i class="fas fa-shipping-fast text-charcoal text-2xl"></i>
            </div>
            <h3 class="font-serif text-2xl text-champagne mb-3">Worldwide Shipping</h3>
            <p class="text-cream/60 text-sm leading-relaxed">Free express shipping on orders over $200. Delivery within 3-7 business days.</p>
          </div>
          <div class="text-center p-8 border border-champagne/20 rounded-lg">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
              <i class="fas fa-heart text-charcoal text-2xl"></i>
            </div>
            <h3 class="font-serif text-2xl text-champagne mb-3">Quality Guarantee</h3>
            <p class="text-cream/60 text-sm leading-relaxed">30-day satisfaction guarantee. If you're not in love, we'll make it right.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Video Section -->
    <section class="py-20 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-serif text-4xl md:text-5xl text-gradient mb-4">See It in Motion</h2>
          <p class="text-cream/60 max-w-xl mx-auto">Watch our hair in action</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="aspect-[9/16] rounded-lg overflow-hidden bg-charcoal">
            <video src="/static/images/d4JfSTBJ.jpg" class="w-full h-full object-cover" autoplay muted loop playsinline></video>
          </div>
          <div class="aspect-[9/16] rounded-lg overflow-hidden bg-charcoal">
            <video src="/static/images/wM5isRYU.jpg" class="w-full h-full object-cover" autoplay muted loop playsinline></video>
          </div>
          <div class="aspect-[9/16] rounded-lg overflow-hidden bg-charcoal">
            <video src="/static/images/mreAEmd7.jpg" class="w-full h-full object-cover" autoplay muted loop playsinline></video>
          </div>
          <div class="aspect-[9/16] rounded-lg overflow-hidden bg-charcoal">
            <video src="/static/images/F8KK7Hmk.jpg" class="w-full h-full object-cover" autoplay muted loop playsinline></video>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-serif text-4xl md:text-5xl text-gradient mb-4">What Our Queens Say</h2>
          <p class="text-cream/60">Real reviews from real customers</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 p-8 rounded-lg border border-pink/20">
            <div class="flex text-champagne text-sm mb-4">★★★★★</div>
            <p class="text-cream/80 text-sm leading-relaxed mb-6">"The quality of this hair is absolutely amazing! It's so soft and the curls hold beautifully. I've received so many compliments!"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-serif">A</div>
              <div><p class="text-cream font-medium text-sm">Ashley M.</p><p class="text-cream/40 text-xs">Verified Buyer</p></div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 p-8 rounded-lg border border-pink/20">
            <div class="flex text-champagne text-sm mb-4">★★★★★</div>
            <p class="text-cream/80 text-sm leading-relaxed mb-6">"Best lace front I've ever purchased. The hairline looks so natural and the hair doesn't tangle or shed. Customer service was also excellent!"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-serif">K</div>
              <div><p class="text-cream font-medium text-sm">Keisha T.</p><p class="text-cream/40 text-xs">Verified Buyer</p></div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 p-8 rounded-lg border border-pink/20">
            <div class="flex text-champagne text-sm mb-4">★★★★★</div>
            <p class="text-cream/80 text-sm leading-relaxed mb-6">"I'm obsessed with my new wig! The color is gorgeous and it looks like it's growing from my scalp. Shipping was fast too. 10/10 recommend!"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-serif">T</div>
              <div><p class="text-cream font-medium text-sm">Tamara L.</p><p class="text-cream/40 text-xs">Verified Buyer</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="py-20 px-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal"></div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="font-serif text-4xl md:text-6xl text-gradient mb-6">Ready to Slay?</h2>
        <p class="text-cream/70 text-lg mb-10 max-w-2xl mx-auto">Join thousands of confident women who trust Nimen Luxuries for their premium hair needs.</p>
        <a href="/shop" class="btn-primary px-12 py-4 rounded text-sm font-medium tracking-wider inline-block">SHOP NOW</a>
      </div>
    </section>
    
    <!-- Instagram Feed -->
    <section class="py-20 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-serif text-4xl md:text-5xl text-gradient mb-4">@NimenLuxuries</h2>
          <p class="text-cream/60">Follow us for styling inspiration</p>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/1bep1ySR.jpg" alt="Curly brown wig Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/hgPmTYKi.jpg" alt="Bouncy curly bob Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/s3thTl7P.jpg" alt="Highlighted body wave Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/72KVO0fo.jpg" alt="Premium wig collection Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/sENTKw6g.jpg" alt="Straight hair bundle Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
          <a href="https://instagram.com/nimenluxuries" class="aspect-square overflow-hidden group" aria-label="View on Instagram" rel="noopener noreferrer" target="_blank"><img src="/static/images/71fkn8Bu.jpg" alt="Deep wave wig Instagram post" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200" decoding="async"></a>
        </div>
      </div>
    </section>
  `
  
  return c.html(baseLayout('Premium Luxury Hair', content))
})

// Shop Page
app.get('/shop', (c) => {
  const allProductsHTML = products.map(productCard).join('')
  
  const content = `
    <section class="pt-16 pb-8 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl text-gradient text-center mb-4">Shop Collection</h1>
        <p class="text-cream/60 text-center max-w-2xl mx-auto">Discover our premium selection of 100% human hair wigs, bundles, and accessories</p>
      </div>
    </section>
    
    <section class="py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-pink/20">
          <span class="text-cream/60 text-sm">Filter:</span>
          <select id="category-filter" onchange="applyFilters()" class="bg-charcoal border border-pink/40 rounded px-4 py-2 text-cream text-sm">
            <option value="">All Categories</option>
            <option value="wigs">Wigs</option>
            <option value="bundles">Bundles</option>
            <option value="closures">Closures</option>
            <option value="frontals">Frontals</option>
          </select>
          <select id="texture-filter" onchange="applyFilters()" class="bg-charcoal border border-pink/40 rounded px-4 py-2 text-cream text-sm">
            <option value="">All Textures</option>
            <option value="straight">Straight</option>
            <option value="body-wave">Body Wave</option>
            <option value="deep-wave">Deep Wave</option>
            <option value="curly">Curly</option>
            <option value="bouncy">Bouncy</option>
          </select>
          <select id="sort-filter" onchange="applyFilters()" class="bg-charcoal border border-pink/40 rounded px-4 py-2 text-cream text-sm">
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <div class="flex-1"></div>
          <span id="product-count" class="text-cream/60 text-sm">${products.length} products</span>
        </div>
        <div id="products-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          ${allProductsHTML}
        </div>
      </div>
    </section>
  `
  
  const scripts = `
    <script>
      const allProductsData = ${JSON.stringify(products)};
      
      function applyFilters() {
        const category = document.getElementById('category-filter').value;
        const texture = document.getElementById('texture-filter').value;
        const sort = document.getElementById('sort-filter').value;
        const params = new URLSearchParams(window.location.search);
        if (params.get('category')) document.getElementById('category-filter').value = params.get('category');
        
        let filtered = [...allProductsData];
        if (category) filtered = filtered.filter(p => p.category === category);
        if (texture) filtered = filtered.filter(p => p.texture === texture);
        if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
        if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
        if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        
        document.getElementById('product-count').textContent = filtered.length + ' products';
        document.getElementById('products-grid').innerHTML = filtered.map(p => {
          const saleTag = p.originalPrice > p.price ? '<div class="absolute top-3 left-3 bg-rose-gold text-cream text-xs px-2 py-1 rounded">SALE</div>' : '';
          const origPrice = p.originalPrice > p.price ? '<span class="text-cream/40 text-sm line-through">$' + p.originalPrice + '</span>' : '';
          return '<a href="/product/' + p.id + '" class="product-card group"><div class="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 mb-4"><img src="' + p.image + '" alt="' + p.name + '" class="w-full h-full object-cover" loading="lazy" width="300" height="400" decoding="async">' + saleTag + '<div class="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span class="btn-primary px-6 py-2 rounded text-xs font-medium tracking-wider">QUICK VIEW</span></div></div><h3 class="text-cream font-medium text-sm mb-1 group-hover:text-champagne transition-colors">' + p.name + '</h3><div class="flex items-center gap-2"><span class="text-champagne font-serif text-lg">$' + p.price + '</span>' + origPrice + '</div><div class="flex items-center gap-1 mt-2"><div class="flex text-champagne text-xs">★★★★★</div><span class="text-cream/40 text-xs">(' + p.reviews + ')</span></div></a>';
        }).join('');
      }
      
      // Apply URL filters on load
      const params = new URLSearchParams(window.location.search);
      if (params.get('category')) { document.getElementById('category-filter').value = params.get('category'); applyFilters(); }
      if (params.get('texture')) { document.getElementById('texture-filter').value = params.get('texture'); applyFilters(); }
    </script>
  `
  
  return c.html(baseLayout('Shop', content, scripts))
})

// Product Detail Page
app.get('/product/:id', (c) => {
  const id = c.req.param('id')
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return c.html(baseLayout('Product Not Found', `
      <div class="min-h-[60vh] flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-serif text-4xl text-champagne mb-4">Product Not Found</h1>
          <p class="text-cream/60 mb-8">The product you're looking for doesn't exist.</p>
          <a href="/shop" class="btn-primary px-8 py-3 rounded">BACK TO SHOP</a>
        </div>
      </div>
    `))
  }
  
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)
  const lengthsHTML = product.lengths ? product.lengths.map((len, i) => 
    `<button onclick="selectLength(this)" class="length-btn px-4 py-2 border border-pink/40 rounded text-sm text-cream/80 hover:border-champagne hover:text-champagne transition-colors ${i === 0 ? 'border-champagne text-champagne' : ''}" data-length="${len}">${len}</button>`
  ).join('') : ''
  
  const densitiesHTML = product.densities && product.densities[0] !== 'Standard' ? product.densities.map((den, i) => 
    `<button onclick="selectDensity(this)" class="density-btn px-4 py-2 border border-pink/40 rounded text-sm text-cream/80 hover:border-champagne hover:text-champagne transition-colors ${i === 0 ? 'border-champagne text-champagne' : ''}" data-density="${den}">${den}</button>`
  ).join('') : ''
  
  const content = `
    <section class="py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <nav class="text-sm mb-8">
          <a href="/" class="text-cream/60 hover:text-champagne">Home</a>
          <span class="text-cream/40 mx-2">/</span>
          <a href="/shop" class="text-cream/60 hover:text-champagne">Shop</a>
          <span class="text-cream/40 mx-2">/</span>
          <span class="text-champagne">${product.name}</span>
        </nav>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-4">
            <div class="aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
              <img src="${product.image}" alt="${product.name} - Premium human hair product" class="w-full h-full object-cover" width="600" height="800" loading="eager" fetchpriority="high">
            </div>
          </div>
          
          <div>
            <h1 class="font-serif text-3xl md:text-4xl text-cream mb-4">${product.name}</h1>
            <div class="flex items-center gap-2 mb-6">
              <div class="flex text-champagne">★★★★★</div>
              <span class="text-cream/60 text-sm">${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="flex items-center gap-4 mb-8">
              <span class="text-champagne font-serif text-4xl">$${product.price}</span>
              ${product.originalPrice > product.price ? `
                <span class="text-cream/40 text-xl line-through">$${product.originalPrice}</span>
                <span class="bg-rose-gold text-cream text-sm px-3 py-1 rounded">SAVE $${product.originalPrice - product.price}</span>
              ` : ''}
            </div>
            <p class="text-cream/70 leading-relaxed mb-8">${product.description}</p>
            
            ${lengthsHTML ? `
              <div class="mb-6">
                <label class="text-cream/80 text-sm font-medium mb-3 block">Length</label>
                <div class="flex flex-wrap gap-2">${lengthsHTML}</div>
              </div>
            ` : ''}
            
            ${densitiesHTML ? `
              <div class="mb-8">
                <label class="text-cream/80 text-sm font-medium mb-3 block">Density</label>
                <div class="flex flex-wrap gap-2">${densitiesHTML}</div>
              </div>
            ` : ''}
            
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <div class="flex items-center border border-pink/40 rounded">
                <button onclick="updateQty(-1)" class="px-4 py-3 text-cream/60 hover:text-champagne">-</button>
                <span id="qty" class="px-4 py-3 text-cream">1</span>
                <button onclick="updateQty(1)" class="px-4 py-3 text-cream/60 hover:text-champagne">+</button>
              </div>
              <button onclick="addProductToCart()" class="flex-1 btn-primary py-4 rounded text-sm font-medium tracking-wider">ADD TO BAG</button>
            </div>
            
            <div class="border-t border-pink/20 pt-8 space-y-4">
              <div class="flex items-center gap-3"><i class="fas fa-check text-champagne"></i><span class="text-cream/70 text-sm">100% Premium Human Hair</span></div>
              <div class="flex items-center gap-3"><i class="fas fa-check text-champagne"></i><span class="text-cream/70 text-sm">HD Swiss Lace Frontal</span></div>
              <div class="flex items-center gap-3"><i class="fas fa-check text-champagne"></i><span class="text-cream/70 text-sm">Pre-Plucked Natural Hairline</span></div>
              <div class="flex items-center gap-3"><i class="fas fa-check text-champagne"></i><span class="text-cream/70 text-sm">Can Be Dyed, Bleached & Styled</span></div>
              <div class="flex items-center gap-3"><i class="fas fa-shipping-fast text-champagne"></i><span class="text-cream/70 text-sm">Free Express Shipping on Orders Over $200</span></div>
            </div>
          </div>
        </div>
        
        ${relatedProducts.length > 0 ? `
          <div class="mt-20">
            <h2 class="font-serif text-3xl text-gradient mb-8">You May Also Like</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              ${relatedProducts.map(productCard).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `
  
  const scripts = `
    <script>
      const currentProduct = ${JSON.stringify(product)};
      let selectedLength = currentProduct.lengths ? currentProduct.lengths[0] : '';
      let selectedDensity = currentProduct.densities && currentProduct.densities[0] !== 'Standard' ? currentProduct.densities[0] : '';
      let quantity = 1;
      
      function selectLength(btn) {
        document.querySelectorAll('.length-btn').forEach(b => b.classList.remove('border-champagne', 'text-champagne'));
        btn.classList.add('border-champagne', 'text-champagne');
        selectedLength = btn.dataset.length;
      }
      function selectDensity(btn) {
        document.querySelectorAll('.density-btn').forEach(b => b.classList.remove('border-champagne', 'text-champagne'));
        btn.classList.add('border-champagne', 'text-champagne');
        selectedDensity = btn.dataset.density;
      }
      function updateQty(delta) {
        quantity = Math.max(1, quantity + delta);
        document.getElementById('qty').textContent = quantity;
      }
      function addProductToCart() {
        const variant = [selectedLength, selectedDensity].filter(Boolean).join(' - ');
        for (let i = 0; i < quantity; i++) {
          addToCart({ id: currentProduct.id + '-' + variant, name: currentProduct.name, price: currentProduct.price, image: currentProduct.image }, variant);
        }
      }
    </script>
  `
  
  return c.html(baseLayout(product.name, content, scripts))
})

// About Page
app.get('/about', (c) => {
  const content = `
    <section class="relative py-32 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-gradient mb-6">Our Story</h1>
        <p class="text-cream/70 text-lg">Crafting luxury hair experiences for women who deserve the very best.</p>
      </div>
    </section>
    
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="flex flex-col items-center space-y-4">
            <img src="/static/images/logo-transparent.png" alt="" class="w-32 h-auto" width="128" height="128" loading="lazy" decoding="async">
            <img src="/static/images/logo-3d.png" alt="Nimen Luxuries brand logo" class="w-full max-w-sm mx-auto" width="384" height="128" loading="lazy" decoding="async">
          </div>
          <div>
            <h2 class="font-serif text-3xl md:text-4xl text-champagne mb-6">The Beginning</h2>
            <p class="text-cream/70 leading-relaxed mb-6">Nimen Luxuries was born from a simple belief: every woman deserves access to premium quality hair that makes her feel confident, beautiful, and unstoppable.</p>
            <p class="text-cream/70 leading-relaxed mb-6">Founded in 2020, we started as a small boutique with a passion for helping women find their perfect hair match. Today, we've grown into a global luxury hair brand.</p>
            <p class="text-cream/70 leading-relaxed">Our commitment to quality remains unchanged. We source only the finest 100% human hair from trusted suppliers.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-20 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-serif text-3xl md:text-4xl text-gradient text-center mb-12">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-8">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center"><i class="fas fa-leaf text-charcoal text-2xl"></i></div>
            <h3 class="font-serif text-2xl text-champagne mb-4">Ethically Sourced</h3>
            <p class="text-cream/60 text-sm leading-relaxed">We partner only with suppliers who meet our strict ethical sourcing standards.</p>
          </div>
          <div class="text-center p-8">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center"><i class="fas fa-award text-charcoal text-2xl"></i></div>
            <h3 class="font-serif text-2xl text-champagne mb-4">Premium Quality</h3>
            <p class="text-cream/60 text-sm leading-relaxed">Every piece is carefully inspected and tested to ensure it meets our luxury standards.</p>
          </div>
          <div class="text-center p-8">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center"><i class="fas fa-heart text-charcoal text-2xl"></i></div>
            <h3 class="font-serif text-2xl text-champagne mb-4">Customer First</h3>
            <p class="text-cream/60 text-sm leading-relaxed">Your satisfaction is our priority. We're here to support you every step of the way.</p>
          </div>
        </div>
      </div>
    </section>
  `
  return c.html(baseLayout('About Us', content))
})

// Hair Care Guide
app.get('/hair-care', (c) => {
  const content = `
    <section class="relative py-32 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-gradient mb-6">Hair Care Guide</h1>
        <p class="text-cream/70 text-lg">Expert tips to keep your Nimen hair looking flawless.</p>
      </div>
    </section>
    
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto space-y-16">
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><span class="text-charcoal font-serif text-xl">1</span></div>
            <h2 class="font-serif text-2xl md:text-3xl text-champagne">Washing Your Hair</h2>
          </div>
          <div class="pl-16 space-y-4 text-cream/70">
            <p>• Detangle gently with a wide-tooth comb before washing</p>
            <p>• Use sulfate-free shampoo to maintain moisture</p>
            <p>• Wash in a downward motion to prevent tangling</p>
            <p>• Apply deep conditioner weekly for optimal hydration</p>
            <p>• Rinse with cool water to seal the cuticle</p>
          </div>
        </div>
        
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><span class="text-charcoal font-serif text-xl">2</span></div>
            <h2 class="font-serif text-2xl md:text-3xl text-champagne">Styling Tips</h2>
          </div>
          <div class="pl-16 space-y-4 text-cream/70">
            <p>• Always use heat protectant before styling with hot tools</p>
            <p>• Keep heat below 350°F (180°C) to prevent damage</p>
            <p>• Allow hair to air dry when possible</p>
            <p>• Use lightweight oils for shine and moisture</p>
            <p>• Your Nimen hair can be colored—always do a strand test first</p>
          </div>
        </div>
        
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><span class="text-charcoal font-serif text-xl">3</span></div>
            <h2 class="font-serif text-2xl md:text-3xl text-champagne">Storage & Maintenance</h2>
          </div>
          <div class="pl-16 space-y-4 text-cream/70">
            <p>• Store on a wig stand or mannequin head to maintain shape</p>
            <p>• Keep in a cool, dry place away from direct sunlight</p>
            <p>• Use a silk or satin bag for travel</p>
            <p>• Sleep with a silk bonnet or pillowcase</p>
          </div>
        </div>
      </div>
    </section>
  `
  return c.html(baseLayout('Hair Care Guide', content))
})

// Contact Page
app.get('/contact', (c) => {
  const content = `
    <section class="relative py-32 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-gradient mb-6">Get In Touch</h1>
        <p class="text-cream/70 text-lg">We'd love to hear from you. Our team is always here to help.</p>
      </div>
    </section>
    
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="font-serif text-2xl text-champagne mb-6">Send Us a Message</h2>
            <form id="contact-form" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name *" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                <input type="text" placeholder="Last Name *" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
              </div>
              <input type="email" placeholder="Email Address *" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
              <select required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream">
                <option value="">Select a topic *</option>
                <option value="order">Order Inquiry</option>
                <option value="product">Product Question</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="other">Other</option>
              </select>
              <textarea placeholder="Message *" required rows="5" class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40 resize-none"></textarea>
              <button type="submit" class="btn-primary w-full py-4 rounded text-sm font-medium tracking-wider">SEND MESSAGE</button>
            </form>
          </div>
          
          <div>
            <h2 class="font-serif text-2xl text-champagne mb-6">Contact Information</h2>
            <div class="space-y-8">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><i class="fas fa-envelope text-charcoal"></i></div>
                <div><h3 class="text-cream font-medium mb-1">Email</h3><p class="text-cream/70">support@nimenluxuries.com</p></div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><i class="fab fa-whatsapp text-charcoal text-xl"></i></div>
                <div><h3 class="text-cream font-medium mb-1">WhatsApp</h3><p class="text-cream/70">+1 (555) 123-4567</p></div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-full gold-gradient flex items-center justify-center flex-shrink-0"><i class="fab fa-instagram text-charcoal text-xl"></i></div>
                <div><h3 class="text-cream font-medium mb-1">Instagram</h3><p class="text-cream/70">@NimenLuxuries</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  
  const scripts = `<script>document.getElementById('contact-form').addEventListener('submit', function(e) { e.preventDefault(); alert('Thank you! We will get back to you within 24 hours.'); this.reset(); });</script>`
  
  return c.html(baseLayout('Contact Us', content, scripts))
})

// FAQ Page
app.get('/faq', (c) => {
  const content = `
    <section class="relative py-32 px-4 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-gradient mb-6">FAQ</h1>
        <p class="text-cream/70 text-lg">Find answers to commonly asked questions</p>
      </div>
    </section>
    
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 class="font-serif text-2xl text-champagne mb-6">Products</h2>
          <div class="space-y-4">
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">What type of hair do you sell?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">We sell 100% premium human hair including raw virgin hair and Remy hair. All our hair is ethically sourced and undergoes strict quality control.</p></div>
            </div>
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">Can I color or bleach the hair?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">Yes! Our human hair can be colored, bleached, and styled just like your natural hair. We recommend having a professional colorist handle any chemical processes.</p></div>
            </div>
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">How long will the hair last?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">With proper care, our wigs can last 1-2 years, and our bundles can last 6-12 months. Following our hair care guide will help maximize the lifespan.</p></div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 class="font-serif text-2xl text-champagne mb-6">Shipping</h2>
          <div class="space-y-4">
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">Do you ship internationally?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">Yes! We ship worldwide. Free express shipping is available on orders over $200. International orders typically arrive within 7-14 business days.</p></div>
            </div>
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">How long does shipping take?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">Domestic orders (USA): 3-5 business days. International orders: 7-14 business days. Express shipping options are available at checkout.</p></div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 class="font-serif text-2xl text-champagne mb-6">Returns</h2>
          <div class="space-y-4">
            <div class="border border-champagne/20 rounded-lg overflow-hidden">
              <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180')" class="w-full flex items-center justify-between p-6 text-left">
                <span class="text-cream font-medium pr-4">What is your return policy?</span>
                <i class="fas fa-chevron-down text-champagne transition-transform"></i>
              </button>
              <div class="hidden px-6 pb-6"><p class="text-cream/70 leading-relaxed">We offer a 30-day satisfaction guarantee. Items must be unworn, unaltered, and in original packaging to qualify for a return or exchange.</p></div>
            </div>
          </div>
        </div>
        
        <div class="mt-16 p-8 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 rounded-lg border border-pink/20 text-center">
          <h3 class="font-serif text-2xl text-champagne mb-4">Still Have Questions?</h3>
          <p class="text-cream/70 mb-6">Our support team is happy to help.</p>
          <a href="/contact" class="btn-primary px-10 py-3 rounded text-sm font-medium tracking-wider inline-block">CONTACT SUPPORT</a>
        </div>
      </div>
    </section>
  `
  return c.html(baseLayout('FAQ', content))
})

// Cart Page
app.get('/cart', (c) => {
  const content = `
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="font-serif text-4xl text-gradient mb-8">Shopping Bag</h1>
        <div id="cart-page-content"></div>
      </div>
    </section>
  `
  
  const scripts = `
    <script>
      function renderCartPage() {
        const cart = JSON.parse(localStorage.getItem('nimen-cart') || '[]');
        const container = document.getElementById('cart-page-content');
        
        if (cart.length === 0) {
          container.innerHTML = '<div class="text-center py-20"><i class="fas fa-shopping-bag text-6xl text-champagne/30 mb-6"></i><h2 class="font-serif text-2xl text-cream mb-4">Your bag is empty</h2><p class="text-cream/60 mb-8">Looks like you haven\\'t added anything yet.</p><a href="/shop" class="btn-primary px-10 py-4 rounded text-sm font-medium tracking-wider inline-block">CONTINUE SHOPPING</a></div>';
          return;
        }
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal >= 200 ? 0 : 15;
        const total = subtotal + shipping;
        
        let itemsHTML = '';
        cart.forEach(item => {
          itemsHTML += '<div class="flex gap-6 p-6 bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 rounded-lg"><img src="' + item.image + '" alt="' + item.name + '" class="w-24 h-32 object-cover rounded"><div class="flex-1"><div class="flex justify-between"><h3 class="text-cream font-medium">' + item.name + '</h3><button onclick="removeFromCart(\\'' + item.id + '\\'); renderCartPage();" class="text-cream/40 hover:text-red-400"><i class="fas fa-trash-alt"></i></button></div><p class="text-cream/60 text-sm mt-1">' + (item.variant || '') + '</p><div class="flex items-center justify-between mt-4"><div class="flex items-center gap-3"><button onclick="updateQuantity(\\'' + item.id + '\\', -1); renderCartPage();" class="w-8 h-8 border border-pink/40 rounded flex items-center justify-center text-cream/60 hover:text-champagne">-</button><span class="text-cream">' + item.quantity + '</span><button onclick="updateQuantity(\\'' + item.id + '\\', 1); renderCartPage();" class="w-8 h-8 border border-pink/40 rounded flex items-center justify-center text-cream/60 hover:text-champagne">+</button></div><span class="text-champagne font-serif text-xl">$' + (item.price * item.quantity).toFixed(2) + '</span></div></div></div>';
        });
        
        container.innerHTML = '<div class="grid grid-cols-1 lg:grid-cols-3 gap-12"><div class="lg:col-span-2 space-y-6">' + itemsHTML + '</div><div class="lg:col-span-1"><div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 p-8 rounded-lg sticky top-28"><h2 class="font-serif text-xl text-champagne mb-6">Order Summary</h2><div class="space-y-4 mb-6"><div class="flex justify-between text-cream/70"><span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span></div><div class="flex justify-between text-cream/70"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)) + '</span></div>' + (subtotal < 200 ? '<p class="text-champagne text-sm">Add $' + (200 - subtotal).toFixed(2) + ' more for free shipping!</p>' : '') + '</div><div class="border-t border-champagne/20 pt-4 mb-6"><div class="flex justify-between text-cream"><span class="font-medium">Total</span><span class="font-serif text-2xl text-champagne">$' + total.toFixed(2) + '</span></div></div><a href="/checkout" class="btn-primary w-full py-4 rounded text-sm font-medium tracking-wider block text-center">PROCEED TO CHECKOUT</a><a href="/shop" class="btn-secondary w-full py-4 rounded text-sm font-medium tracking-wider block text-center mt-4">CONTINUE SHOPPING</a></div></div></div>';
      }
      renderCartPage();
    </script>
  `
  
  return c.html(baseLayout('Shopping Bag', content, scripts))
})

// Checkout Page
app.get('/checkout', (c) => {
  const content = `
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="font-serif text-4xl text-gradient mb-8">Checkout</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form id="checkout-form" class="space-y-8">
              <div>
                <h2 class="font-serif text-xl text-champagne mb-4">Contact Information</h2>
                <div class="space-y-4">
                  <input type="email" placeholder="Email address" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                  <input type="tel" placeholder="Phone number" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                </div>
              </div>
              <div>
                <h2 class="font-serif text-xl text-champagne mb-4">Shipping Address</h2>
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                    <input type="text" placeholder="Last name" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                  </div>
                  <input type="text" placeholder="Address" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                  <div class="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                    <input type="text" placeholder="State" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                    <input type="text" placeholder="ZIP code" required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                  </div>
                  <select required class="w-full bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded px-4 py-3 text-cream">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                  </select>
                </div>
              </div>
              <div>
                <h2 class="font-serif text-xl text-champagne mb-4">Payment</h2>
                <div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 border border-pink/40 rounded p-6">
                  <div class="flex items-center gap-2 mb-4"><i class="fab fa-cc-stripe text-2xl text-champagne"></i><span class="text-cream">Secure payment via Stripe</span></div>
                  <div class="space-y-4">
                    <input type="text" placeholder="Card number" required class="w-full bg-charcoal border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                    <div class="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM / YY" required class="w-full bg-charcoal border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                      <input type="text" placeholder="CVC" required class="w-full bg-charcoal border border-pink/40 rounded px-4 py-3 text-cream placeholder-cream/40">
                    </div>
                  </div>
                  <div class="flex items-center gap-4 mt-4 text-cream/40 text-xs"><i class="fas fa-lock"></i><span>Your payment information is encrypted and secure</span></div>
                </div>
              </div>
              <button type="submit" class="btn-primary w-full py-4 rounded text-sm font-medium tracking-wider">COMPLETE ORDER</button>
            </form>
          </div>
          <div>
            <div class="bg-gradient-to-br from-purple-dark/30 via-charcoal/50 to-pink-dark/30 p-8 rounded-lg sticky top-28">
              <h2 class="font-serif text-xl text-champagne mb-6">Order Summary</h2>
              <div id="checkout-items" class="space-y-4 mb-6 max-h-80 overflow-y-auto"></div>
              <div class="border-t border-champagne/20 pt-6 space-y-4">
                <div class="flex justify-between text-cream/70"><span>Subtotal</span><span id="checkout-subtotal">$0.00</span></div>
                <div class="flex justify-between text-cream/70"><span>Shipping</span><span id="checkout-shipping">Calculated</span></div>
                <div class="flex justify-between text-cream font-medium pt-4 border-t border-champagne/20"><span>Total</span><span id="checkout-total" class="font-serif text-2xl text-champagne">$0.00</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  
  const scripts = `
    <script>
      function renderCheckout() {
        const cart = JSON.parse(localStorage.getItem('nimen-cart') || '[]');
        if (cart.length === 0) { window.location.href = '/cart'; return; }
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal >= 200 ? 0 : 15;
        const total = subtotal + shipping;
        
        let itemsHTML = '';
        cart.forEach(item => {
          itemsHTML += '<div class="flex gap-4"><div class="relative"><img src="' + item.image + '" alt="' + item.name + '" class="w-16 h-20 object-cover rounded"><span class="absolute -top-2 -right-2 bg-champagne text-charcoal text-xs w-5 h-5 rounded-full flex items-center justify-center">' + item.quantity + '</span></div><div class="flex-1"><h4 class="text-cream text-sm">' + item.name + '</h4><p class="text-cream/60 text-xs">' + (item.variant || '') + '</p></div><span class="text-champagne">$' + (item.price * item.quantity).toFixed(2) + '</span></div>';
        });
        
        document.getElementById('checkout-items').innerHTML = itemsHTML;
        document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
        document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);
      }
      
      document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your order! You will receive a confirmation email shortly.');
        localStorage.removeItem('nimen-cart');
        window.location.href = '/';
      });
      
      renderCheckout();
    </script>
  `
  
  return c.html(baseLayout('Checkout', content, scripts))
})

export default app
