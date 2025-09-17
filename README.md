# 📌 TeamFlow - Employee Task & Team Management  

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![License](https://img.shields.io/badge/license-MIT-blue)  
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

