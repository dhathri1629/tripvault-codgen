# ✈️ TripVault

A full-stack travel memory management web application built during the CodGen Full Stack MERN Virtual Internship.

## 🌍 Live Application

**Frontend:**  
https://tripvault-codgen-1.onrender.com

**Backend API:**  
https://tripvault-codgen.onrender.com

**GitHub Repository:**  
https://github.com/dhathri1629/tripvault-codgen

---

## 📌 Project Overview

TripVault is a travel memory management application that allows users to create and manage their trips, upload travel photos, maintain public profiles, and share their travel experiences.

The project was developed progressively across four weeks, starting with authentication and trip management and ending with a responsive, fully deployed application.

---

# 🚀 Features

## Week 1 — Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- User session management
- Logout functionality
- Password-protected accounts

## Week 2 — Trip Management

- Create trips
- View trips
- View individual trip details
- Edit trips
- Delete trips
- Trip ownership protection
- Destination and travel information
- Favorites / likes functionality
- Dashboard for managing trips

## Week 3 — Photos & Public Profiles

- Upload travel photos
- Cloudinary image storage
- Cover images for trips
- Multiple photos per trip
- Photo gallery
- All Photos page
- Public user profiles
- Unique usernames
- User bios
- Public trip listings
- Public profiles accessible without login

## Week 4 — UI Polish & Deployment

- Loading states
- User-friendly error handling
- Toast notifications
- Empty states
- Responsive UI
- Mobile-friendly layouts
- Responsive navigation
- Hamburger menu for mobile screens
- Consistent styling
- Navbar with navigation and logout
- Footer with project information
- Backend deployed on Render
- Frontend deployed on Render
- MongoDB Atlas connected
- Cloudinary connected
- Production environment variables configured
- End-to-end testing on the live application
- Live application URL added to project documentation

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Framer Motion
- React Icons
- React Toastify
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary

### Deployment & Services

- MongoDB Atlas
- Cloudinary
- Render
- GitHub

---

# 🏗️ Project Structure

```text
TripVault-Week4/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Hero.jsx
│       │   ├── Navbar.jsx
│       │   ├── StatsCard.jsx
│       │   ├── TripCard.jsx
│       │   └── TripList.jsx
│       │
│       ├── pages/
│       │   ├── AddTrip.jsx
│       │   ├── AllPhotos.jsx
│       │   ├── Dashboard.jsx
│       │   ├── EditTrip.jsx
│       │   ├── Favorites.jsx
│       │   ├── Login.jsx
│       │   ├── PublicProfile.jsx
│       │   ├── Register.jsx
│       │   └── TripDetails.jsx
│       │
│       ├── services/
│       │   ├── photoService.js
│       │   └── tripService.js
│       │
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── tripController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Trip.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── photoRoutes.js
│   │   ├── profileRoutes.js
│   │   └── tripRoutes.js
│   │
│   └── index.js
│
├── package.json
├── README.md
└── .gitignore