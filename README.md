# 📌 TeamFlow - Employee Task & Team Management  

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)  
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)  
![Netlify](https://img.shields.io/badge/Deployed%20On-Netlify-00C7B7?logo=netlify&logoColor=white)  
![Heroku](https://img.shields.io/badge/Backend%20API-Heroku-430098?logo=heroku&logoColor=white)  

🔗 **Live Demo**: [Frontend (Netlify)](https://your-netlify-link.com) | [Backend (Heroku)](https://your-heroku-link.com)  

---

## 🚀 Features  

### 👨‍💼 For Managers  
- Assign tasks to employees  
- Track assigned tasks and progress  
- Verify completed tasks with links/evidence  
- Dashboard overview of team activity  

### 👩‍💻 For Employees  
- View assigned tasks  
- Submit completed work with verification details  
- Get status updates on tasks  

### 🔑 General  
- Role-based functionality (Manager & Employee)  
- Responsive and modern UI (React + Material UI)  
- MongoDB-based efficient task management using collections:  
  - **TaskList** → Stores task details (assignedBy, verifiedOn, etc.)  
  - **EmplTask** → Maps assignedTo (employeeID) with taskIDs  
  - **VerifyTask** → Stores verification details (taskID, link, comments, etc.)  

---

## 🛠️ Tech Stack  

- **Frontend**: React, Material UI, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas)  
- **Deployment**: Netlify (Frontend) + Render/Heroku (Backend)  

---

## 📂 Project Structure  
TeamFlow/
│── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Main pages (Dashboard, Login, etc.)
│ │ ├── utils/ # Helper functions & API calls
│ │ └── App.js
│── server/ # Express backend
│ ├── models/ # Mongoose schemas (TaskList, EmplTask, VerifyTask, User)
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── middleware/ # Validation & error handling
│ └── server.js
│── package.json
│── README.md


---

## ⚡ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/teamflow.git
cd teamflow


2️⃣ Backend Setup

cd server
npm install


Create a .env file inside server/ and add:

MONGO_URI=your_mongodb_atlas_uri
PORT=5000


Run the server:

npm start

3️⃣ Frontend Setup
cd client
npm install
npm start


🧑‍💻 Contributor

Prasath (MERN developer, database & backend integration)


