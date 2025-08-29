# ✨ Features

## 👤 User Features

### 🔐 Authentication & Authorization
- User Register & Login  
- Email Verification via **Mailtrap**  
- Forgot Password & Reset Password  

### 📝 Profile Management
- Update Profile Details  

### 🔎 Search & Browse
- Search Restaurants by **City, Country, or Restaurant Name**  
- See available **Cuisines**  
- View **Restaurant Details Page**  

### 🛒 Cart & Orders
- Add Food to Cart  
- Increase/Decrease Cart Quantity  
- Place Orders  
- Payment Integration with **Stripe Checkout**  
- Automatic Order Confirmation via **Stripe Webhook**  
- View User’s Past Orders  

---

## 🛠️ Admin Features

### 🏢 Restaurant Management
- Create One Restaurant  
- Edit Restaurant Details  

### 🍴 Menu Management
- Add Multiple Menus under Restaurant  
- Edit Menu Items  
- Delete Menus  

### 📦 Order Management
- View All Orders  
- Change Order Status (✅ Confirmed, 🍳 Preparing, 🚚 Out for Delivery, 📬 Delivered)  

---

## 🔒 Security
- Private Routes for **Users & Admins**  
- JWT Authentication with **Cookies**  
- Zod Validation for all input fields  

---

# 🏗️ Tech Stack

## 🎨 Frontend
- ⚛️ React + TypeScript  
- 🎯 Redux Toolkit (State Management)  
- 🎨 Tailwind CSS + ShadCN UI  

## 🚀 Backend
- Express.js + TypeScript  
- MongoDB + Mongoose  
- Zod (Input Validation)  
- JWT Authentication  

## 🔧 Others
- 💳 Stripe Checkout + Webhooks (Payment & Order Confirmation)  
- 📧 Mailtrap (Email Verification & Reset Password)  
- ☁️ Cloudinary (Image Upload & Management)  

---

# 📸 Screens & Flows

- 🔐 **Auth Flow** → Register → Verify Email → Login → Forgot/Reset Password  
- 🏠 **User Flow** → Search Restaurants → View Cuisines → Add to Cart → Checkout → Payment → Order Tracking  
- 🛠️ **Admin Flow** → Create Restaurant → Add Menus → Manage Menus → Manage Orders  

---

# ⚙️ Installation

### 1️⃣ Clone Repo
```bash
git clone https://github.com/shariyerShazan/MealMart-restaurant-client
cd meakmart
