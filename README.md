# 🧠 AutoConnect

**AutoConnect** is a full-stack web application for **buying and selling cars**, built as a final React project at SoftUni. Registered users can post detailed car listings and save cars from other users in a personal wishlist.

🔗 **GitHub Repository**: [AutoConnect-React-Softuni-FinalProject](https://github.com/SvetozarSlivarov/AutoConnect-React-Softuni-FinalProject)

---

## 📦 Project Structure

```
AutoConnect/
│
├── client/            # Frontend - React + Vite + Bootstrap
│   └── src/
│       ├── components/   # UI components
│       ├── context/      # Auth context
│       ├── services/     # API service functions
│       ├── utils/        # Helpers, validators
│       ├── App.jsx       # Routes
│       └── main.jsx      # Entry point
│
├── server/            # Backend - Express + MongoDB
│   └── src/
│       ├── config/       # DB config
│       ├── controllers/  # Logic
│       ├── routes/       # API endpoints
│       ├── models/       # Mongoose schemas
│       ├── middlewares/  # Auth, ownership
│       └── server.js     # App entry
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/SvetozarSlivarov/AutoConnect-React-Softuni-FinalProject.git
cd AutoConnect-React-Softuni-FinalProject
```

### 2. Start frontend

```bash
cd client
npm install
npm run dev
```

### 3. Start backend

```bash
cd server
npm install
npm run dev
```

---

## 🔐 Authentication

- JWT-based auth
- Token is saved in `localStorage` and managed via `AuthContext`
- On login/register, token is stored and sent with all protected requests via:

```http
Authorization: Bearer <token>
```

- On app load, token is verified via `/api/auth/me`

---

## 🧠 Data Models

### 👤 User

```js
{
  firstName,
  lastName,
  email,
  password,       // hashed
  watchlist: [Car._id]
}
```

### 🚗 Car

```js
{
  brand, model, year, price,
  fuelType, transmission,
  power, mileage, color,
  condition, features,
  description,
  images: [
    { url, public_id } // stored in cloud
  ],
  owner: User._id
}
```

🖼️ Images are stored in a **cloud service** (Cloudinary); DB stores `url` and `public_id`.

---

## 📡 API Overview

### Auth Routes

| Method | Endpoint                      | Protected | Description                    |
|--------|-------------------------------|-----------|--------------------------------|
| POST   | `/api/auth/register`          | ❌        | Register a new user            |
| POST   | `/api/auth/login`             | ❌        | Login and receive JWT          |
| GET    | `/api/auth/me`                | ✅        | Get current user info          |
| GET    | `/api/auth/check-email/:email`| ❌        | Check if email is registered   |

### Car Routes

| Method | Endpoint          | Protected        | Description                    |
|--------|-------------------|------------------|--------------------------------|
| GET    | `/api/cars`       | ❌               | Get all car listings           |
| GET    | `/api/cars/:id`   | ❌               | Get one car by ID              |
| POST   | `/api/cars`       | ✅               | Create car (with images)       |
| PUT    | `/api/cars/:id`   | ✅ + owner       | Update car                     |
| DELETE | `/api/cars/:id`   | ✅ + owner       | Delete car                     |

### User & Watchlist

| Method | Endpoint                | Protected | Description                        |
|--------|-------------------------|-----------|------------------------------------|
| GET    | `/api/users`           | ❌        | Get all users                      |
| GET    | `/api/users/:id`       | ❌        | Get user by ID                     |
| PUT    | `/api/users/watchlist` | ✅        | Add/remove car to/from watchlist   |
| GET    | `/api/users/:id/profile`| ✅       | Get full profile of current user   |

---

## 🖥️ Frontend Architecture (React + Vite)

### 🔐 Auth with Context API

- `AuthContext` stores `user` and `token`
- Token is pulled from `localStorage` on app load
- `/api/auth/me` is used to validate session
- Login/Logout logic updates state and localStorage

```jsx
<AuthContext.Provider value={{ user, token, login, logout }}>
```

### 🚫 Protected Routes

- A `<ProtectedRoute>` wrapper component redirects unauthenticated users to `/login`
- Original URL is remembered and restored after login

### 📤 Car Form

- Form uses Bootstrap components
- Upload field accepts max 5 images
- Files are passed as `FormData` to backend
- Required fields: all except `features[]` and images

```jsx
<Form.Control type="file" multiple onChange={handleFileChange} accept="image/*" />
```

### ✅ Validations

- **Client-side validation** for all forms:
  - ✅ Required fields: first name, last name, email, password, car listing fields, etc.
  - ✅ Email format validation (`isValidEmail`)
  - ✅ Password strength validation (`isValidPassword`)
    - At least 6 characters
    - Must include at least one letter and one number
  - ✅ Password confirmation matches
  - ✅ Terms & conditions checkbox must be accepted
- **Email uniqueness**:
  - Checked via API before submission (`checkEmailExists`)
  - Shows specific message if email is already in use
- **Car listing form validation** (`validateCarForm`):
  - ✅ All required fields: brand, model, year, price, etc.
  - ✅ Select fields (fuel type, transmission, condition)
  - ✅ Description validation (optional, but controlled)
  - ✅ Image upload:
    - At least 1 image required
    - Max 5 images enforced with live preview & removal
  - ✅ Validation error messages are shown per field
  - ✅ Scrolls to first error automatically
- **Field-specific error messages** shown immediately
- **Loading indicators** during async actions (login, register, upload)
- **Redirects**:
  - 🔁 Register → Login (after successful registration)
  - 🔁 Login → `/` or previously intended route (if provided)
  - 🔁 Logged-in users visiting `/login` or `/register` are automatically redirected to `/`

### 🧱 UI Components

- Reusable:
  - `Navbar`, `Footer` (present on all pages)
  - `CarCard`, `CarForm`, `CarDetails`
  - `LoginForm`, `RegisterForm`

### 🔁 UX Enhancements

- Component-level loaders
- Error and success messages displayed inline
---

## 👤 Author

**Svetozar Slivarov**  
[GitHub Profile](https://github.com/SvetozarSlivarov)

---

