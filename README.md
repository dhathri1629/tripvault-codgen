# TripVault 🚀

TripVault is a full-stack travel memory journal application where users can create, store, and manage their travel experiences.

## 📌 Project Overview

TripVault allows users to securely log their trips, save travel details, upload travel photos, manage their memories, like trips, save favorite trips, and share public travel profiles.

This project is developed as part of the CodGen Virtual Internship Program.

---

## ✅ Week 1 Completed Features

* Backend project setup using Node.js and Express.js
* MongoDB Atlas database integration
* Environment variable configuration
* User signup and login authentication
* Password encryption using bcryptjs
* JWT-based authentication
* Protected API routes
* Create travel memories API
* Fetch user-specific trips API

---

## ✅ Week 2 Completed Features

### 🧳 Trip Management

* Create new trips
* View all user trips
* View individual trip details
* Edit trip details
* Delete trips
* Store trip title
* Store destination
* Store start date
* Store end date
* Store trip description
* Add trip ratings from 1 to 5 stars

### ❤️ Trip Interaction

* Like trips
* Unlike trips
* Persistent like status
* Favorites functionality
* User-specific trip management

### 🔐 Protected Operations

Trip creation, editing, deletion, liking, and other private operations are protected using JWT authentication.

---

## ✅ Week 3 Completed Features

### 📸 Photo Management

* Cloudinary integration for travel photo storage
* Upload multiple photos to a trip
* Upload up to 10 photos in one request
* JPG image support
* JPEG image support
* PNG image support
* WEBP image support
* Maximum 5 MB per image
* Display uploaded trip photos
* Display existing photos while editing a trip
* Add additional photos to an existing trip
* Preview newly selected photos before uploading
* Remove selected photos before uploading
* Delete existing trip photos
* Automatic cover image selection
* Display photo count on trip cards
* Location-based Cloudinary folders

Example Cloudinary folder structure:

```text
tripvault/goa
tripvault/kerala
tripvault/mysore
tripvault/hyderabad
```

---

### 👤 Public Profiles

* Public user profile pages
* Username-based profile URLs
* Public profiles accessible without authentication
* Display user's name
* Display username
* Display user bio
* Display number of trips
* Display user's public trips
* Display travel memories
* Display uploaded trip photos

Example public profile:

```text
http://localhost:5173/profile/vamshi
```

---

### 🖼️ Trip Cards

Trip cards display:

* Trip title
* Destination
* Trip date
* Description
* Cover image
* Number of photos
* Like button
* Edit button
* Delete button

---

### ✏️ Edit Trip

The Edit Trip page supports:

* Loading existing trip information
* Editing trip title
* Editing destination
* Editing start date
* Editing end date
* Editing description
* Editing rating
* Viewing existing photos
* Adding new photos
* Previewing new photos
* Removing selected new photos
* Saving updated trip information

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* Multer
* Cloudinary
* multer-storage-cloudinary
* CORS
* dotenv

### Tools Used

* Visual Studio Code
* PowerShell
* Postman
* Git
* GitHub
* Cloudinary
* MongoDB Atlas

---

## 📂 Project Structure

```text
TripVault
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── TripCard.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── AddTrip.jsx
│   │   │   ├── AllPhotos.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services
│   │   │   ├── photoService.js
│   │   │   └── tripService.js
│   │   │
│   │   └── styles
│   │
│   └── package.json
│
├── server
│   ├── config
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── tripController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── Trip.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── photoRoutes.js
│   │   ├── profileRoutes.js
│   │   └── tripRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication

TripVault uses JWT-based authentication.

After successful login, the server generates a JWT token.

Protected requests send the token using:

```text
Authorization: Bearer <token>
```

Passwords are encrypted using bcryptjs before being stored in MongoDB.

---

## 👤 User Management

Each user has:

* Name
* Username
* Email
* Password
* Bio
* Account creation date

Usernames are stored in lowercase and are unique.

The application automatically generates a username when one is not provided during registration.

---

## 🧳 Trip Management API

### Create Trip

```text
POST /api/trips
```

### Get All Trips

```text
GET /api/trips
```

### Get Single Trip

```text
GET /api/trips/:id
```

### Update Trip

```text
PUT /api/trips/:id
```

### Like / Unlike Trip

```text
PUT /api/trips/:id/like
```

### Delete Trip

```text
DELETE /api/trips/:id
```

---

## 📸 Photo API

### Upload Trip Photos

```text
POST /api/photos/:tripId
```

The request uses multipart form data with the field:

```text
photos
```

### Delete Trip Photo

```text
DELETE /api/photos/:tripId
```

Photos are stored using Cloudinary and their URLs are stored with the trip information.

---

## 👤 Public Profile API

### Get Public Profile

```text
GET /api/users/:username/profile
```

Example:

```text
GET /api/users/vamshi/profile
```

This route does not require authentication.

The response contains:

* Public user information
* Username
* Bio
* Account creation date
* User's trips
* Trip photos
* Trip details

---

## ☁️ Cloudinary Integration

TripVault uses Cloudinary to store uploaded travel photos.

Instead of storing image files directly inside the server, images are uploaded to Cloudinary.

The application stores the resulting Cloudinary URLs with the corresponding trip.

### Supported Formats

```text
JPG
JPEG
PNG
WEBP
```

### File Size

```text
Maximum 5 MB per image
```

### Maximum Upload

```text
10 photos per upload request
```

---

## 🧪 Testing Completed

The following features have been tested during development.

### Authentication Testing

* User registration
* User login
* JWT token generation
* Protected routes
* Invalid authentication handling

### Trip Testing

* Create trip
* View trips
* View individual trip
* Edit trip
* Delete trip
* Rating
* Like trip
* Unlike trip
* Favorites

### Photo Testing

* Upload photo
* Upload multiple photos
* Display uploaded photos
* Display existing photos
* Add more photos
* Preview selected photos
* Remove selected photos
* Delete existing photos
* Cover image
* Photo count

### Profile Testing

* Public profile
* Username lookup
* Profile information
* Public trips
* Public photos

---

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the Project

```bash
cd tripvault-codgen
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

Do not commit the actual `.env` file or secret values to GitHub.

### 5. Start Backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 7. Start Frontend

```bash
npm run dev
```

Open the frontend URL shown by Vite in the terminal.

---

## 🌐 Main Application Routes

```text
/login
/register
/dashboard
/add-trip
/edit-trip/:id
/favorites
/all-photos
/profile/:username
```

Example:

```text
/profile/vamshi
```

---

## 📊 Development Progress

| Week   | Status      |
| ------ | ----------- |
| Week 1 | ✅ Completed |
| Week 2 | ✅ Completed |
| Week 3 | ✅ Completed |
| Week 4 | 🔜 Upcoming |

---

## 🚀 Current Status

TripVault currently supports authentication, trip management, photo management, favorites, likes, and public travel profiles.

Week 3 development and testing have been completed successfully.

Further features and improvements will be implemented in the upcoming internship weeks.

---

## 👩‍💻 Internship Project

TripVault is being developed as part of the **CodGen Virtual Internship Program**.
