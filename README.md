# 🛍️ SoulStore Admin E-commerce

A fully functional, responsive e-commerce platform with a centralized admin system for managing product inventory. Designed to deliver a smooth and intuitive shopping experience for users, while offering seamless tools for admins to manage categories, subcategories, and product updates.

## 🔗 Live Project
[Visit Repository](https://github.com/shubham79a/soulstore-admin-ecommerce.git)

---

## ✨ Features

- 🧭 **Smooth Browsing Experience** — Optimized for seamless product navigation
- 🔍 **Search & Filtering System** — Filter by size, category, subcategory, and price
- 💳 **Multiple Payment Options** — Supports Cash on Delivery, Stripe, and Razorpay
- 📱 **Fully Responsive Design** — Works flawlessly across all screen sizes
- 🧑‍💻 **Admin Dashboard** — Centralized system for managing inventory and product details
- 💡 **User-Friendly UI** — Clean and modern interface for both users and admins

---

## 🛠️ Tech Stack

### Client
- **React.js**
- **Tailwind CSS** — For responsive, clean UI

### Server
- **Node.js**
- **Express.js**

### Additional Integrations
- **Stripe & Razorpay** — Secure online payment gateways
- **Cloudinary** — For efficient image storage and handling

---

## 📂 Folder Structure (High-level)

soulstore-admin-ecommerce/ ├── client/ # Frontend (React + Tailwind) ├── server/ # Backend (Express + Node) └── README.md



---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shubham79a/soulstore-admin-ecommerce.git
cd soulstore-admin-ecommerce

```

## 2. Environment Variables
Create a .env file in the server/ folder with the following:

```bash
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

JWT_SECRET=QUANT

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

CURRENCY=INR
```


## 3. Install Dependencies
Install dependencies for both client and server:

```bash
cd client
npm install

cd ../server
npm install
```

## 4. Run the Development Servers
Start the Backend Server:

```bash
cd server
npm start
```

Start the Frontend Dev Server:
```bash
cd client
npm start
```

### Frontend: http://localhost:3000
### Backend: http://localhost:5000

## 🛡️ License
This project is open-source under the MIT License.

## ✨ Author
### Made with ❤️ by @shubham79a
### 🔗 [Connect on LinkedIn](https://www.linkedin.com/in/shubham-kumar-894799290/)
