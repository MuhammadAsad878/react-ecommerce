# React E-Commerce Application - Architecture & Best Practices Guide

## 📁 Recommended Folder Structure

```
src/
├── api/                    # API layer & HTTP clients
│   ├── axios.js           # Axios instance with interceptors
│   ├── endpoints.js       # API endpoint constants
│   └── services/
│       ├── authService.js
│       ├── productService.js
│       ├── cartService.js
│       ├── orderService.js
│       └── paymentService.js
│
├── assets/                 # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── styles/
│       ├── variables.css
│       └── global.css
│
├── components/             # Reusable UI components
│   ├── common/            # Generic reusable components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Loader/
│   │   ├── Card/
│   │   └── Skeleton/
│   │
│   ├── forms/             # Form-specific components
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── CheckoutForm/
│   │   └── AddressForm/
│   │
│   └── features/          # Feature-specific components
│       ├── product/
│       │   ├── ProductCard/
│       │   ├── ProductGallery/
│       │   ├── ProductReviews/
│       │   └── ProductFilters/
│       ├── cart/
│       │   ├── CartItem/
│       │   ├── CartSummary/
│       │   └── CartDrawer/
│       └── checkout/
│           ├── PaymentMethod/
│           ├── ShippingOptions/
│           └── OrderSummary/
│
├── config/                 # App configuration
│   ├── constants.js       # App-wide constants
│   ├── routes.js          # Route definitions
│   └── env.js             # Environment variables
│
├── context/               # React Context providers
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ThemeContext.jsx
│   └── index.js
│
├── hooks/                 # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useProducts.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useMediaQuery.js
│   └── usePagination.js
│
├── layout/                # Layout components
│   ├── MainLayout/
│   │   ├── MainLayout.jsx
│   │   └── index.js
│   ├── AuthLayout/
│   ├── Navbar/
│   ├── Footer/
│   ├── Sidebar/
│   └── Header/
│
├── pages/                 # Page/Route components
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.module.css
│   │   ├── components/    # Page-specific components
│   │   │   ├── HeroBanner/
│   │   │   ├── FeaturedProducts/
│   │   │   └── Categories/
│   │   └── index.js
│   ├── Products/
│   ├── ProductDetail/
│   ├── Cart/
│   ├── Checkout/
│   ├── Auth/
│   │   ├── Login/
│   │   └── Register/
│   ├── Profile/
│   ├── Orders/
│   └── NotFound/
│
├── store/                 # State management (Redux/Zustand)
│   ├── index.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── productSlice.js
│   │   └── uiSlice.js
│   └── middleware/
│
├── utils/                 # Utility functions
│   ├── helpers.js
│   ├── validators.js
│   ├── formatters.js
│   ├── storage.js
│   └── errorHandler.js
│
├── App.jsx
├── main.jsx
└── routes.jsx             # Route configuration
```

---

## 📝 Naming Conventions

### Files & Folders
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.jsx` |
| Hooks | camelCase with `use` prefix | `useAuth.js` |
| Utils/Helpers | camelCase | `formatPrice.js` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS` |
| CSS Modules | ComponentName.module.css | `Button.module.css` |
| Context | PascalCase with Context suffix | `AuthContext.jsx` |
| Services | camelCase with Service suffix | `authService.js` |

### Variables & Functions
```javascript
// ✅ DO
const productList = [];
const isLoading = true;
const handleSubmit = () => {};
const fetchUserData = async () => {};
const ITEMS_PER_PAGE = 20;

// ❌ DON'T
const product_list = [];
const ProductList = []; // for non-components
const fetch_user_data = () => {};
```

---

## 🏗️ Design Strategies

### 1. Component Architecture

#### Atomic Design Pattern
```
atoms/      → Button, Input, Label, Icon
molecules/  → SearchBar, ProductPrice, Rating
organisms/  → ProductCard, Navbar, CartDrawer
templates/  → PageLayout, GridLayout
pages/      → HomePage, ProductPage
```

#### Container-Presentational Pattern
```javascript
// Container (Smart) - handles logic
const ProductListContainer = () => {
  const { products, loading } = useProducts();
  return <ProductList products={products} loading={loading} />;
};

// Presentational (Dumb) - handles UI only
const ProductList = ({ products, loading }) => {
  if (loading) return <Skeleton />;
  return products.map(p => <ProductCard key={p.id} {...p} />);
};
```

### 2. State Management Strategy

| State Type | Solution | Use Case |
|------------|----------|----------|
| Server State | React Query / TanStack Query | API data, caching |
| Client State | Zustand / Redux Toolkit | Cart, UI state |
| Form State | React Hook Form | Form handling |
| URL State | React Router | Filters, pagination |
| Local State | useState / useReducer | Component-specific |

### 3. API Layer Design
```javascript
// api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiry
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## ✅ DO's (Best Practices)

### Code Organization
- **DO** keep components small and focused (< 200 lines)
- **DO** use index.js for clean exports: `export { default } from './Button'`
- **DO** colocate related files (component, styles, tests)
- **DO** use absolute imports with path aliases
```javascript
// vite.config.js
resolve: {
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@hooks': '/src/hooks',
  }
}
```

### Performance
- **DO** lazy load routes and heavy components
```javascript
const ProductDetail = lazy(() => import('@pages/ProductDetail'));
```
- **DO** memoize expensive computations
```javascript
const sortedProducts = useMemo(() => 
  products.sort((a, b) => a.price - b.price), 
  [products]
);
```
- **DO** use React.memo for pure components
- **DO** implement virtualization for long lists (react-window)
- **DO** optimize images (WebP, lazy loading, srcset)

### State Management
- **DO** lift state only when necessary
- **DO** use React Query for server state (auto caching, refetching)
- **DO** normalize complex nested data
- **DO** keep cart state in context/global store with localStorage sync

### Error Handling
- **DO** implement error boundaries
```javascript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```
- **DO** show user-friendly error messages
- **DO** implement retry logic for failed requests
- **DO** log errors to monitoring service (Sentry)

### Security
- **DO** sanitize user inputs
- **DO** validate on both client and server
- **DO** use HTTPS everywhere
- **DO** store tokens securely (httpOnly cookies preferred)
- **DO** implement CSRF protection
- **DO** use Content Security Policy headers

### Testing
- **DO** write unit tests for utils and hooks
- **DO** write integration tests for critical flows (checkout, auth)
- **DO** use MSW for API mocking
- **DO** test accessibility with jest-axe

### E-Commerce Specific
- **DO** implement optimistic UI updates for cart
- **DO** persist cart state for guest users
- **DO** implement proper loading states and skeletons
- **DO** handle out-of-stock scenarios gracefully
- **DO** implement proper SEO (meta tags, structured data)

---

## ❌ DON'Ts (Anti-Patterns)

### Code Organization
- **DON'T** create deeply nested folder structures (max 3-4 levels)
- **DON'T** put all components in one folder
- **DON'T** mix business logic with UI components
- **DON'T** have circular dependencies

### Performance
- **DON'T** fetch data on every render
```javascript
// ❌ BAD
useEffect(() => {
  fetchProducts();
}); // Missing dependency array!

// ✅ GOOD
useEffect(() => {
  fetchProducts();
}, []);
```
- **DON'T** create new objects/arrays in render
```javascript
// ❌ BAD - creates new array every render
<Select options={[{id: 1}, {id: 2}]} />

// ✅ GOOD - stable reference
const OPTIONS = [{id: 1}, {id: 2}];
<Select options={OPTIONS} />
```
- **DON'T** use index as key for dynamic lists
- **DON'T** import entire libraries
```javascript
// ❌ BAD
import _ from 'lodash';

// ✅ GOOD
import debounce from 'lodash/debounce';
```

### State Management
- **DON'T** put everything in global state
- **DON'T** store derived state
```javascript
// ❌ BAD
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
// total is derived from items!

// ✅ GOOD
const [items, setItems] = useState([]);
const total = items.reduce((sum, item) => sum + item.price, 0);
```
- **DON'T** mutate state directly
- **DON'T** use context for frequently updating state (causes re-renders)

### Security
- **DON'T** store sensitive data in localStorage
- **DON'T** expose API keys in frontend code
- **DON'T** trust client-side validation alone
- **DON'T** log sensitive information
- **DON'T** skip input sanitization

### E-Commerce Specific
- **DON'T** show prices without proper formatting
- **DON'T** allow checkout without cart validation
- **DON'T** skip inventory checks before order
- **DON'T** ignore edge cases (empty cart, out of stock)
- **DON'T** forget mobile responsiveness

---

## 🛠️ Recommended Tech Stack

| Category | Recommended | Alternative |
|----------|-------------|-------------|
| Framework | React 18+ | Next.js (for SSR/SEO) |
| Routing | React Router v6 | TanStack Router |
| State (Server) | TanStack Query | SWR |
| State (Client) | Zustand | Redux Toolkit |
| Forms | React Hook Form + Zod | Formik + Yup |
| Styling | Tailwind CSS | CSS Modules, Styled Components |
| UI Library | shadcn/ui, Radix | Material UI, Chakra |
| HTTP Client | Axios | Fetch + wrapper |
| Testing | Vitest + Testing Library | Jest |
| E2E Testing | Playwright | Cypress |
| Animation | Framer Motion | React Spring |

---

## 📊 Key Metrics to Monitor

- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Keep initial JS < 200KB
- **Time to Interactive**: < 3.5s
- **Cart Abandonment Rate**: Track with analytics
- **Error Rate**: < 1% for critical flows

---

## 🔄 Git Workflow & Conventions

### Branch Naming
```
feature/add-product-filters
bugfix/cart-total-calculation
hotfix/payment-gateway-error
refactor/checkout-flow
```

### Commit Messages (Conventional Commits)
```
feat(cart): add quantity selector
fix(checkout): resolve payment validation
refactor(products): optimize list rendering
docs(readme): update setup instructions
```

---

## 📋 Pre-Production Checklist

- [ ] All environment variables configured
- [ ] Error boundaries implemented
- [ ] Loading states for all async operations
- [ ] 404 and error pages created
- [ ] SEO meta tags and Open Graph
- [ ] Analytics integration
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Accessibility audit passed
- [ ] Security headers configured
- [ ] SSL certificate active
- [ ] Payment integration tested (sandbox → production)
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed

---

*This guide follows industry best practices as of 2026. Adapt based on your specific requirements and team preferences.*
