# 🚗 AutoCONNECT - Car Marketplace

AutoCONNECT is a web application for buying and selling cars. Users can browse the car catalog, register, log in, and post listings.

## 📌 Features:
- 🔹 User registration and login
- 🔹 Browse **car catalog**
- 🔹 Add, edit, and delete car listings (only by the owner or admin)
- 🔹 Detailed car page
- 🔹 Filter and sort cars
- 🔹 Protected routes with JWT authentication

---

## ⚙️ **Technologies Used**
### 📌 **Front-end**:
- React.js
- React Router
- Context API (for managing user sessions)
- Bootstrap 5

### 📌 **Back-end**:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcrypt (for password hashing)

---

## 🚀 **How to Start the Project?**

---

### **1. Set Up the Back-end**
1. **Navigate to the server directory:**
   ```sh
   cd server
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the server:**
   ```sh
   npm run dev
   ```
_(Back-end will be available at **http://localhost:5000**)_

---

### **2. Set Up the Front-end**
1. **Navigate to the client directory:**
   ```sh
   cd ../client
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the React app:**
   ```sh
   npm run dev
   ```
   _(Front-end will be available at **http://localhost:5173**)_

---

## 📌 **API Endpoints**
### **Authentication (JWT)**
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/profile` - Get logged-in user profile

### **Cars**
- **GET** `/api/cars` - Get all cars
- **GET** `/api/cars/:id` - Get details of a specific car
- **POST** `/api/cars` - Add a new car (only for registered users)
- **PUT** `/api/cars/:id` - Edit car details (only by owner or admin)
- **DELETE** `/api/cars/:id` - Delete a car listing (only by owner or admin)

---

## 🛠 **Future Improvements**
- ✅ Add **filters and search** in the catalog
- ✅ Improve **form validation** for registration and login
- ✅ Optimize the **car detail page**
- ⏳ Implement a "Wishlist" to save favorite cars
- ⏳ Add a car rating system

---

## 👨‍💻 **Authors**
- **Svetozar Slivarov**

🎉 **Thank you for using AutoCONNECT!** 🚀

