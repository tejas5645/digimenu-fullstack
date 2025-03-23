# DigiMenu Full-Stack Web Application

## Project Overview
DigiMenu is a full-stack web application designed to manage a digital restaurant menu. The project includes an admin panel for handling menu items, food groups, and quantities, built with React for the frontend, Express.js and PostgreSQL for the backend, and session-based authentication for secure access.

---

## Features
- **Admin Panel:**
  - Add, update, and delete menu items, food groups, and quantities.
  - Responsive and dynamic UI using Bootstrap and a React template.
  
- **REST API Backend:**
  - Implemented CRUD operations (Create, Read, Update, Delete) for managing menu data.
  - Session-based authentication to secure admin access.

- **Database Integration:**
  - PostgreSQL database for storing menu-related data.
  
---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Bootstrap**: For responsive design and ready-made form components.
- **React Template**: Used to streamline frontend layout and structure.

### Backend
- **Node.js** and **Express.js**: For building REST API routes and backend logic.
- **PostgreSQL**: Database for storing and managing menu data.
- **Session-Based Authentication**: To securely manage user sessions.

---

## How to Run the Project Locally

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/digimenu.git
```

### Step 2: Navigate to the Project Directory
```bash
cd digimenu
```

### Step 3: Install Dependencies

#### Install Node Modules
```bash
npm install
```

### Step 4: Run the Application

#### Run the Project
```bash
npm start
```

### Step 5: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Folder Structure
```sh
DigiMenu-FullStack/
├── backend/
│    ├── server.js                 # Main server file   
│    ├── db.js                     # Database connection file  
│    ├── routes/                   # Route definitions  
│    │   ├── adminRoutes.js  
│    │   ├── menuRoutes.js
│    │   ├── foodGroupRoutes.js  
│    │   ├── quantityRoutes.js  
│    ├── controllers/               # Controllers handle request logic  
│    │   ├── adminController.js     #Login for admin endpoints
│    │   ├── menuController.js      #Login for menu endpoints
│    │   ├── foodGroupController.js # Logic for food group endpoints  
│    │   ├── quantityController.js  # Logic for quantity endpoints  
│    ├── .env                       # Environment variables  
│    ├── package.json               # Project dependencies  
│    └── README.md                  # Project documentation
│
├── frontend/
│   ├── node_modules/            # Libraries and dependencies  
│   ├── public/                  # Assets folder (images, etc.)  
│   ├── src/                     # Source folder containing main React code  
│   │   ├── main.jsx             # Main entry point for React  
│   │   ├── admin/               # Admin-related React components  
│   │   └── components/          # Reusable components  
│   │  
│   ├── index.html               # Main HTML file  
│   ├── package.json             # Project dependencies  
│   ├── .gitignore               # Ignore unnecessary files  
│   └── README.md                # Project documentation (this file) 
│  
└── README.md                    # Project documentation  

```

---

## Future Improvements
- Add custom CSS for enhanced styling and a more unique UI.
- Implement detailed error handling for better user feedback.
- Expand user roles beyond admin (e.g., waiter or manager).

---

