# Product Requirements Document
## E-Commerce Platform (Snitch-inspired) — MERN Stack

---

## 1. Overview

**Project Name:** StyleHub (working title — rename as per choice)

**Vision:** Ek fashion e-commerce platform jaha sellers apne products list kar sakein aur buyers browse, search, aur purchase kar sakein. Snitch jaisa clean, fast, mobile-friendly shopping experience.

**Tech Stack:**
- **Frontend:** React.js (Vite), React Router, Tailwind CSS, Redux Toolkit / Zustand (state management), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (Access + Refresh Token strategy)
- **File Storage:** Cloudinary / AWS S3 (product images)
- **Payments:** Razorpay / Stripe (test mode)
- **Other:** Multer (file upload), Zod/Joi (validation), Bcrypt (password hashing), Nodemailer (emails)

---

## 2. User Roles

| Role | Description |
|---|---|
| **Buyer** | Browse products, add to cart, place orders, view order history, write reviews |
| **Seller** | List/manage own products, view orders for their products, update stock |
| **Admin** | Manage all users, approve/reject seller accounts, manage categories, view platform analytics |

---

## 3. Core Features (Phased)

### Phase 1 — MVP (Auth + Product Listing)
- User signup/login (buyer & seller) with JWT
- Role-based authorization (buyer/seller/admin)
- Seller can create, edit, delete their own products
- Public product listing page (all users can view)
- Seller dashboard — view only their own products
- Product categories (T-shirts, Shirts, Jeans, etc.)
- Product search & filters (category, price range, size)

### Phase 2 — Shopping Experience
- Cart functionality (add/remove/update quantity)
- Wishlist
- Checkout flow
- Order placement & order history
- Address management (multiple addresses per user)

### Phase 3 — Payments & Orders
- Payment gateway integration (Razorpay/Stripe test mode)
- Order status tracking (Placed → Shipped → Delivered → Cancelled)
- Seller order management (view orders, update status)
- Email notifications (order confirmation, shipping updates)

### Phase 4 — Reviews & Admin Panel
- Product reviews & ratings (only buyers who purchased)
- Admin panel: approve sellers, manage categories, view platform stats
- Seller analytics (total sales, top products)

---

## 4. Database Schema (MongoDB Collections)

### User
```
{
  _id, name, email, password (hashed),
  role: "buyer" | "seller" | "admin",
  isVerified: Boolean,
  addresses: [ { label, street, city, state, pincode, phone } ],
  createdAt, updatedAt
}
```

### Product
```
{
  _id, title, description, price, discountPrice,
  category, sizes: [String], colors: [String],
  stock, images: [String],
  sellerId: ObjectId (ref: User),
  isActive: Boolean,
  ratingAvg, ratingCount,
  createdAt, updatedAt
}
```

### Cart
```
{
  _id, userId: ObjectId (ref: User),
  items: [ { productId, size, color, quantity } ],
  updatedAt
}
```

### Order
```
{
  _id, buyerId: ObjectId (ref: User),
  items: [ { productId, sellerId, title, price, size, color, quantity } ],
  totalAmount, shippingAddress,
  status: "placed" | "shipped" | "delivered" | "cancelled",
  paymentStatus: "pending" | "paid" | "failed",
  paymentId,
  createdAt, updatedAt
}
```

### Review
```
{
  _id, productId, userId, rating (1-5), comment, createdAt
}
```

---

## 5. API Endpoints (Phase 1 & 2 focus)

### Auth
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
GET    /api/auth/me                    [authenticate]
```

### Products
```
POST   /api/products                   [authenticate, authorize('seller')]
GET    /api/products                   [public — supports ?category=&search=&minPrice=&maxPrice=]
GET    /api/products/:id               [public]
PUT    /api/products/:id               [authenticate, authorize('seller'), checkOwnership]
DELETE /api/products/:id               [authenticate, authorize('seller'), checkOwnership]
GET    /api/products/seller/my-products [authenticate, authorize('seller')]
```

### Cart
```
GET    /api/cart                       [authenticate]
POST   /api/cart/add                   [authenticate]
PUT    /api/cart/update                [authenticate]
DELETE /api/cart/remove/:productId     [authenticate]
```

### Orders
```
POST   /api/orders                     [authenticate]
GET    /api/orders/my-orders           [authenticate]
GET    /api/orders/seller-orders       [authenticate, authorize('seller')]
PUT    /api/orders/:id/status          [authenticate, authorize('seller')]
```

---

## 6. Middleware Design (Backend Architecture)

```
/middlewares
  authenticate.js       → verifies JWT, attaches req.user
  authorize.js          → authorize(['seller']) checks req.user.role
  checkOwnership.js     → for update/delete, confirms req.user.id === product.sellerId
  validate.js           → runs Zod/Joi schema on req.body
  errorHandler.js        → centralized error catcher (last middleware)

/controllers
  authController.js
  productController.js
  cartController.js
  orderController.js

/models
  User.js, Product.js, Cart.js, Order.js, Review.js

/routes
  authRoutes.js, productRoutes.js, cartRoutes.js, orderRoutes.js

/utils
  generateToken.js, sendEmail.js, cloudinaryUpload.js
```

**Important security rule:** `sellerId` product creation ke time request body se kabhi mat lena — hamesha `req.user.id` (JWT se decode hua) use karna. Isse koi fake seller ID nahi bhej sakta.

---

## 7. Non-Functional Requirements

- **Security:** Password hashing (bcrypt), JWT expiry + refresh token rotation, rate limiting on auth routes, input sanitization
- **Performance:** Pagination on product listing, indexing on `category`, `sellerId`, `price` fields
- **Scalability:** Stateless API (JWT-based, no session storage) so backend can scale horizontally
- **Validation:** Server-side validation on every write endpoint (never trust frontend alone)

---

## 8. Suggested Build Order (for solo learning project)

1. Auth system (signup/login/JWT + role field) — get this rock solid first
2. Product CRUD (seller-only creation, public read) + middleware chain
3. Product listing page (frontend) with filters
4. Cart + Checkout flow
5. Order placement (without real payment first — mock it)
6. Payment gateway integration
7. Reviews + Admin panel (last, polish phase)

---

## 9. Out of Scope (v1)

- Multi-vendor payouts/settlements
- Live chat support
- Recommendation engine
- Mobile app (web-only for v1)