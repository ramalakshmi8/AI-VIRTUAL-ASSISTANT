# 🤖 JARVIS AI Virtual Assistant

A powerful MERN Stack AI Virtual Assistant inspired by JARVIS, built using React, Node.js, Express, MongoDB, Gemini AI, and Web Speech API.

This assistant can:

- 🎤 Listen to your voice
- 🔊 Speak responses back
- 🧠 Think intelligently using Gemini AI
- 🔐 Authenticate users securely
- 🖼️ Allow custom assistant images
- ⚡ Open websites like YouTube, Google, Instagram, etc.
- 🌐 Work on desktop and mobile

---

# 🚀 Live Demo

Frontend: https://assistantui.onrender.com

Backend: https://assistantbackend-a5qb.onrender.com

---



# ✨ Features

- 🎙️ Voice Input using Web Speech API
- 🔊 Voice Output (English + Telugu Support)
- 🧠 Smart AI Responses using Gemini AI
- 🔐 JWT Authentication System
- 🔑 Password Hashing using bcryptjs
- ☁️ Cloudinary Image Upload
- 📱 Fully Responsive UI
- 🎨 Customize Assistant Name & Image
- 📜 User History Tracking
- 🌍 Open Google, YouTube, Instagram, Facebook, Weather, Calculator, etc.
- ⚡ Real-Time Interaction

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Web Speech API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary

## AI

- Gemini AI API

## Deployment

- Render

---

# 📂 Project Structure

```bash
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

# 🔥 Backend Setup

## Go to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
PORT=8000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Start backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

# 💻 Frontend Setup

## Open new terminal

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
VITE_BACKEND_URL=http://localhost:8000
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🚀 Deployment on Render

# Backend Deployment

## Environment

```bash
Node
```

## Root Directory

```bash
backend
```

## Build Command

```bash
npm install
```

## Start Command

```bash
npm start
```

---

# Frontend Deployment

## Environment

```bash
Static Site
```

## Root Directory

```bash
frontend
```

## Build Command

```bash
npm install && npm run build
```

## Publish Directory

```bash
dist
```

---

# 🔐 Environment Variables for Render

# Backend Environment Variables

```env
MONGO_URI=your_mongodb_url

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

# Frontend Environment Variables

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

---

# 🧠 Supported Commands

- Open YouTube
- Search Google for React
- Open Instagram
- Open Facebook
- Open Calculator
- Show Weather
- What is the time?
- What is today's date?
- What day is today?
- What month is this?
- Play songs on YouTube

---

# 🌍 Language Support

✅ English  
✅ Telugu

The assistant automatically detects the language and responds accordingly.

---

# 🔐 Authentication Features

- Signup
- Login
- Logout
- JWT Token Authentication
- Password Encryption with bcryptjs

---

# ☁️ Image Upload

Users can:

- Upload custom assistant images
- Store images securely on Cloudinary

---

# 📱 Responsive Design

Works perfectly on:

- Desktop
- Tablet
- Mobile Devices

---

# 🧑‍💻 Author

Made with ❤️ by YOUR_NAME

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork the repository  
🧠 Contribute improvements
