# GovSchemes - Government Schemes Portal

A beautiful, responsive frontend application for browsing and managing government schemes in India.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed

### Setup

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration (Optional)**
Create a `.env` file in the root directory:
```env
VITE_API_BASE=https://schemeshub.vercel.app
```
*If not set, defaults to https://schemeshub.vercel.app*

4. **Run development server**
```bash
npm run dev
```
Visit http://localhost:8080

5. **Build for production**
```bash
npm run build
```

## 🔐 Admin Access

**Demo Credentials (Frontend-only authentication):**
- Username: `admin`
- Password: `GovSchemes2025!`

⚠️ **Security Warning:** This demo uses client-side credentials only and is NOT secure for production. Implement server-side authentication for production use.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── HeroCarousel.tsx # Hero section carousel
│   └── SchemeCard.tsx   # Scheme list card
├── pages/
│   ├── Home.tsx                 # Landing page with hero & schemes
│   ├── SchemeDetail.tsx         # Individual scheme page
│   ├── Contact.tsx              # Contact form
│   ├── RegisterContributor.tsx  # Contributor registration
│   ├── Admin.tsx                # Admin dashboard (CRUD)
│   └── NotFound.tsx             # 404 page
├── lib/
│   ├── api.ts           # API client and types
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app router
└── index.css            # Design system & global styles
```

## 🎨 Design System

**Color Palette:**
- Background: Warm cream (#F5F1E8)
- Primary: Sage green
- Accent: Terracotta
- Typography: Playfair Display (headings) + Inter (body)

**Key Features:**
- Rounded corners (1rem radius)
- Soft shadows
- Smooth transitions
- Fully responsive grid layouts

## 🌐 API Integration

**Base URL:** `https://schemeshub.vercel.app`

### Endpoints Used:
- `GET /api/schemes` - Fetch paginated schemes
- `GET /api/schemes/:id` - Get single scheme
- `POST /api/schemes` - Create scheme (multipart/form-data)
- `PUT /api/schemes/:id` - Update scheme (multipart/form-data)
- `DELETE /api/schemes/:id` - Delete scheme

### Scheme Object Structure:
```typescript
{
  _id: string;
  name: string;
  category: string;
  details: string;
  content: string;
  link: string;
  imageUrl: string;
  imageKey: string;
  createdAt: string;
}
```

## 🧪 Testing Checklist

- [ ] Home page loads with hero carousel showing scheme images
- [ ] Scheme list displays with left thumbnails and pagination
- [ ] Clicking scheme opens detail page with full content
- [ ] "Go to original portal" button links to scheme.link
- [ ] Contact form opens mailto with form data
- [ ] Contributor registration saves to localStorage and shows success
- [ ] Admin login accepts demo credentials
- [ ] Admin can create, edit, and delete schemes
- [ ] Image upload shows preview before submission
- [ ] Delete confirmation modal appears before deletion
- [ ] All pages are responsive on mobile devices
- [ ] Navigation works across all routes

## 🔧 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **Embla Carousel** - Hero carousel
- **React Router** - Routing
- **Sonner** - Toast notifications

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "axios": "latest",
  "embla-carousel-react": "^8.6.0",
  "embla-carousel-autoplay": "latest",
  "tailwindcss": "^3.x",
  "sonner": "^1.7.4"
}
```

## 🚀 Deployment

This project can be deployed to:
- **Lovable** - Click "Share → Publish" in the Lovable editor
- **Vercel/Netlify** - Connect your Git repository
- **Static Hosting** - Build and upload the `dist` folder

### Build Command:
```bash
npm run build
```

### Output Directory:
```
dist/
```

## 🎯 Features Overview

### Home Page
- Auto-playing hero carousel with featured schemes
- Paginated scheme listing with thumbnails
- Responsive grid layout
- Smooth animations and transitions

### Scheme Detail Page
- Full-width hero image
- Category badge and metadata
- HTML content rendering
- "Go to original portal" CTA
- Social share functionality

### Admin Dashboard
- Secure login (demo credentials)
- Full CRUD operations for schemes
- Image upload with preview
- Confirmation dialogs for destructive actions
- Real-time success/error feedback

### Contact & Registration
- Form validation
- mailto integration for contact
- localStorage for contributor data
- Success confirmations

## 🎨 Customization

### Change Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --primary: 145 25% 45%;  /* Sage green */
  --accent: 15 55% 60%;    /* Terracotta */
  --background: 40 30% 96%; /* Cream */
}
```

### Change API Base URL
Edit `.env`:
```env
VITE_API_BASE=https://your-api-url.com
```

## 🐛 Known Limitations

1. Admin authentication is client-side only (demo purposes)
2. Contributor registration stores data in localStorage only
3. Contact form uses mailto (no backend email service)
4. No advanced search/filter functionality yet

## 📝 License

This project was created for demonstration purposes.

## 🤝 Contributing

To become a contributor, visit `/register-contributor` and submit your application!

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
