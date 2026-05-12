# FakeStore API Router (React + Vite)

A small e-commerce demo built with **React (Vite)**.  
The app uses the public **FakeStore API** for product data and authentication, and a **local JSON Server (`db.json`)** for locally managed products, user ratings, and profile-related data.

---

## Features

- Home page with hero section and product grid
- Product details page
- Category filtering
- Cart sidebar (slide-in)
- Star ratings component
- Add Product page (local CRUD)
- Profile overlay (Login/Logout + account menu)
- Profile page / user products page (local data)
- UI visibility based on authentication state

---

## Tech Stack

- React + Vite
- React Router
- SCSS
- Context API (Auth + Cart)
- Framer Motion (navigation animation)
- JSON Server (local REST API)
- FakeStore API (remote REST API)

---

## Project Structure

- `src/components/`
  - `Cart/`, `Navigation/`, `ProfileOverlay/`, `StarRatings/`, `Footer/`
- `src/context/`
  - `AuthContext.jsx`, `cartContext.jsx`
- `src/pages/`
  - `HomePage/`, `ProductPage/`, `AddProduct/`, `Checkout/`, `ProfilePage/`, `NotFound/`
- `src/utils/api.js`
  - API helpers for FakeStore API and the local JSON server
- `db.json`
  - local data store used by JSON Server

---

## APIs Used

### FakeStore API (remote)
Base URL:
- `https://fakestoreapi.com`

Login endpoint:
- `POST https://fakestoreapi.com/auth/login`

Used for:
- locally created products (`/products`)
- user ratings (`/productRatings`)
- other local collections stored in `db.json`

---

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the project (two terminals)

Terminal 1 (Vite dev server):
```bash
npm run dev
```

Terminal 2 (local JSON Server):
```bash
npm run json-server
```

---

## Authentication

Login is available via the Profile overlay.

Default credentials used in this project:
- **username:** `user`
- **password:** `123`

> Note: Authentication in this project is used for UI access control (show/hide features). It is not a secure backend authorization mechanism.

---

## Notes

- The cart can be opened anytime, but the cart items and cart counter are only visible when the user is authenticated.
- Local CRUD features (Add Product, ratings, user products) require JSON Server to be running.

---

## License

For educational purpose.
