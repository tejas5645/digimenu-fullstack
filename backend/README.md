# Digital Menu API

## Overview  
This is a REST API for managing a digital menu, built with **Express.js** and **PostgreSQL**. It allows users to view menu items, food groups, and quantity options, while admin users can perform CRUD operations on these resources.

## Features  
- CRUD operations for menu items, food groups, and quantity options (admin only).  
- PostgreSQL database integration.  
- Organized project structure with controllers, routes, and database connection.  
- Uses environment variables for database configuration.  
- Authentication and session management for admin users.  

**Note:**  
POST, PUT, and DELETE routes are restricted to admin users only. Admin users need to be logged in to access these routes.

---

## Project Structure  
```sh  
digital-menu-api/  
├── server.js                 # Main server file  
├── db.js                     # Database connection file  
├── routes/                   # Route definitions  
│   ├── adminRoutes.js  
│   ├── menuRoutes.js
│   ├── foodGroupRoutes.js  
│   ├── quantityRoutes.js  
├── controllers/              # Controllers handle request logic  
│   ├── adminController.js    #Login for admin endpoints
│   ├── menuController.js      #Login for menu endpoints
│   ├── foodGroupController.js # Logic for food group endpoints  
│   ├── quantityController.js  # Logic for quantity endpoints  
├── .env                      # Environment variables  
├── package.json              # Project dependencies  
└── README.md                 # Project documentation  


### API Endpoints

## Admin Endpoints
- **GET** `/admin`: description: Get admin panel
- **POST** `/admin/login`: description: Get particular menu by mid
- **GET** `admin/check-session`: Get all menu by letter or word


# Admin Endpoints to handle Menu
- **POST** `/admin/menu`: Add a new menu
- **PUT** `/admin/menu/:mid`: Update a menu
- **PUT** `/admin/menu/price/:mid`: Update a menu price
- **DELETE** `/admin/menu/:mid`: Delete a menu by UID

# Admin Endpoints to handle Food Group
- **POST** `/admin/food_group`: Add a food_group
- **PUT** `/admin/food_group/:fid`: Update a food_group by food_group fid
- **DELETE** `/admin/food_group/:fid`: Delete a food_group by fid

# Admin Endpoints to handle Quantity
- **POST** `/admin/quantity`: Add a  Quantity type
- **PUT** `/admin/quantity/:qid`: Update a  Quantity type by  Quantity qid
- **DELETE** `/admin/quantity/:qid`: Delete a  Quantity type by qid

## Menu Endpoints

- **GET** `/menu`: description: Get all menu
- **GET** `/menu/:mid`: description: Get particular menu by mid
- **GET** `menu/name/:nm`: Get all menu by letter or word

## Food_group Endpoints

- **GET** `/food_group`: Get all food_groups
- **GET** `/food_group/:fid`: Get a specific food_group

## Quantity Endpoints

- **GET** `/quantity`: Get all Quantity types
- **GET** `/quantity/:qid`: Get a specific f Quantity type

## Setup & Installation

### Clone the Repository
```sh
git clone https://github.com/your-repo/digital-menu-api.git
cd digital-menu-api
```

### Install Dependencies
```sh
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add your database configuration:
```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
PORT=5000
```

### Run the Server
```sh
node server.js
```
The API will start at `http://localhost:5000`






