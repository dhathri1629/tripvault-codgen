# ✈️ TripVault

**TripVault** is a full-stack travel memory journal that allows users to securely create, manage, and preserve their travel experiences in one place.

Users can register and log in securely, create trips, record destinations and travel dates, add descriptions and ratings, and manage their saved journeys through a clean and responsive dashboard.

---

## 🌍 Features

### 🔐 Authentication

* User registration
* Secure login
* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Logged-in user profile
* Logout functionality

### 🧳 Trip Management

* Create a new trip
* View personal trips
* View individual trip details
* Edit trip information
* Delete trips
* Add destination and travel dates
* Add trip descriptions
* Rate trips from 1–5 stars

### ❤️ Trip Interaction

* Like/favorite trip interface
* Edit trip
* Delete trip
* Trip cards with travel information

### 👤 User Profile

* Display logged-in user's name
* Display user email
* Profile dropdown
* Logout option

### 🎨 User Interface

* Responsive React interface
* Professional dashboard
* Login and registration pages
* Travel-themed design
* Clean trip cards
* Responsive navigation bar
* Mobile-friendly layout

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Icons
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

### Development Tools

* Visual Studio Code
* Postman
* Git
* GitHub
* MongoDB Atlas

---

## 📁 Project Structure

```text
TripVault/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── TripCard.jsx
│   │   │   └── TripList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AddTrip.jsx
│   │   │
│   │   ├── services/
│   │   │   └── tripService.js
│   │   │
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── navbar.css
│   │   │   ├── tripCard.css
│   │   │   ├── tripList.css
│   │   │   └── addTrip.css
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tripController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── tripRoutes.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔑 Authentication Flow

```text
User
 │
 ├── Register
 │      ↓
 │   Password Hashing
 │      ↓
 │   MongoDB
 │
 └── Login
        ↓
     Verify Password
        ↓
     Generate JWT
        ↓
     Store Token
        ↓
     Access Dashboard
```

Protected requests use the JWT token to identify the logged-in user.

---

## 🧳 Trip Management Flow

```text
Login
  ↓
Dashboard
  ↓
Start New Journey
  ↓
Enter Trip Details
  ↓
Create Trip
  ↓
MongoDB
  ↓
Display Trip Card
```

Users can then edit or delete their trips from the dashboard.

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/signup`   | Signup compatibility route |
| POST   | `/api/auth/login`    | Login user                 |
| GET    | `/api/auth/me`       | Get logged-in user         |

### Trips

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/trips`     | Create a trip     |
| GET    | `/api/trips`     | Get user's trips  |
| GET    | `/api/trips/:id` | Get a single trip |
| PUT    | `/api/trips/:id` | Update a trip     |
| DELETE | `/api/trips/:id` | Delete a trip     |

Protected endpoints require authentication.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
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

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### 5. Start Backend

```bash
npm run dev
```

Backend runs on:

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

Frontend runs on the Vite development server, typically:

```text
http://localhost:5173
```

---

## 🧪 Testing

The backend APIs were tested using **Postman**.

The following functionality was tested:

* User registration
* User login
* JWT authentication
* Get logged-in user
* Create trip
* Get trips
* Get individual trip
* Update trip
* Delete trip

---

## 🔒 Security

TripVault implements basic authentication and authorization practices:

* Passwords are hashed using bcrypt
* JWT tokens are used for authentication
* Protected routes use authentication middleware
* Users can access only their own trips
* Sensitive configuration is stored in environment variables

---

## 📌 Current Project Status

### Completed

* [x] Backend setup
* [x] MongoDB connection
* [x] User model
* [x] User registration
* [x] User login
* [x] Password hashing
* [x] JWT authentication
* [x] Authentication middleware
* [x] Trip model
* [x] Create trip
* [x] View trips
* [x] Update trip
* [x] Delete trip
* [x] React frontend
* [x] Login page
* [x] Registration page
* [x] Dashboard
* [x] Trip cards
* [x] User profile
* [x] Logout
* [x] Responsive UI

### Future Enhancements

* [ ] Trip photo upload
* [ ] Like/favorite persistence
* [ ] Trip search and filtering
* [ ] Interactive maps
* [ ] Trip sharing
* [ ] User profile editing
* [ ] Travel statistics
* [ ] Cloud image storage

---

## 🎯 Project Objective

The main objective of TripVault is to provide users with a simple and secure platform for recording and organizing their travel memories.

The project also demonstrates practical implementation of **MERN stack development, REST APIs, authentication, database management, frontend routing, and responsive UI design**.

---

## 👩‍💻 Developed With

Built as part of the **CodGen Virtual Internship Program**.

**Project:** TripVault – Full Stack Travel Memory Journal

---

## 📄 License

This project is developed for educational and internship purposes.
