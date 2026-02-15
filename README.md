# 🗳️ Realtime Poll Application

A full-stack real-time polling application that allows users to create polls, share unique links, and vote with live updates.  
Built using modern web technologies and deployed for production use.

---

## 🚀 Live Demo

**Frontend (Vercel):**  
https://frontendrealtimepoll.vercel.app  

**Backend (Render):**  
https://realtime-poll-backend-blzh.onrender.com  

**Full Website:**
https://frontendrealtimepoll.vercel.app
---

## ✨ Key Features

- ✅ Create polls with multiple options  
- 🔗 Generate unique shareable poll links  
- ⚡ Real-time voting with Socket.IO  
- 📊 Instant vote updates without page refresh  
- 📱 Responsive and clean UI  
- 💾 Persistent data storage using MongoDB  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- CSS
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB (Mongoose)

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📁 Project Structure

```
Realtime_poll
├── client/        # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── server/        # Backend (Node + Express + Socket.IO)
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

---

## ⚙️ Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/bhawanak0504/Realtime_poll.git
cd Realtime_poll

## ⚙️ Run Locally

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
PORT=10000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
node server.js
```

Backend will run on:

```
http://localhost:10000
```

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🌐 Deployment Details

### 🚀 Backend (Render)

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node server.js`

Add Environment Variable:

```
CLIENT_URL=https://your-frontend-url.vercel.app
```

---

### ⚡ Frontend (Vercel)

- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

To support React Router routing, add a `vercel.json` file inside the `client` folder:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🔄 How It Works

1. User creates a poll.
2. Backend stores poll data in MongoDB.
3. A unique poll ID is generated.
4. A shareable link is created.
5. When a user votes:
   - Vote is saved in the database.
   - Socket.IO emits an update event.
   - All connected clients receive real-time updates instantly.

---

## 🎯 Future Improvements

- 🔐 User authentication system  
- ⏳ Poll expiration feature  
- 📈 Graphical result visualization  
- 🛠️ Admin dashboard  
- 📊 Vote analytics  

---

## 👩‍💻 Author

**Bhawana Kumari**

---

## 📄 License

This project is open-source and available for learning and development purposes.

