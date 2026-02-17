# HYRUP Student Management System – Backend

## 📌 Project Overview

This project is a secure backend API for a Student Management System built using Node.js, Express, and MongoDB.

It implements:
- Secure user authentication using JWT
- Password hashing using bcrypt
- Role-based authorization
- Full CRUD operations for student management
- Pagination
- Search and filtering
- Input validation using express-validator

The system follows RESTful API design principles and clean backend architecture.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- jsonwebtoken (JWT)
- bcryptjs
- express-validator
- dotenv

---

## 🔐 Features Implemented

### 🔑 Authentication
- User Registration
- Password hashing using bcrypt
- Secure login
- JWT token generation
- Token-based route protection

### 🛡 Authorization
- Role-based access control
- Supported roles:
  - admin
  - student
- Only admin users can:
  - Create students
  - Update students
  - Delete students

### 🎓 Student Management
- Create student
- Get all students (with pagination)
- Get single student by ID
- Update student
- Delete student
- Search by first name or last name
- Filter by course

### ✅ Input Validation
- Valid email validation
- Required fields validation
- GPA range validation (0–10)
- Year validation (1–4)
- Structured validation error responses

---

## 📂 Folder Structure

hyrup-backend/
│
├── configurations/
│   └── db.js                # MongoDB connection setup
│
├── middleware/
│   └── auth.js    # JWT authentication middleware
│
├── models/
│   ├── user.js              # User schema (admin / student)
│   └── student.js           # Student schema
│
├── routes/
│   ├── authRoutes.js        # Register & Login routes
│   └── studRoutes.js     # Student CRUD routes
│
├── app.js                   # Main application entry point
├── .env                    # Example environment variables
├── .gitignore               # Ignored files (node_modules, .env)
├── package.json             # Project metadata & dependencies
└── README.md                # Project documentation

---

## Student Model Fields

- studentId: Unique identifier for student
- firstName: Student's first name
- lastName: Student's last name
- email: Unique email address
- phone: Contact number
- course: Enrolled course name
- year: Academic year (1–4)
- enrollmentDate: Date of enrollment
- gpa: Grade Point Average (0–10)
- address: Residential address


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/CharanDeep18-bat/hyrup_backend.git <folder_name>

---

### 2️⃣ Install Dependencies

npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv express-validator
npm install -g nodemon    #install globally

---

### 3️⃣ Create Environment File

Create a .env file in the root directory:

PORT=3030
MONGO_URL=mongodb://127.0.0.1:27017/hyrupDB
JWT_SECRET=hyrupsecretkey


---

### 4️⃣ Run the Server

nodemon app.js

Server will run at : http://localhost:3030

---

## 🔐 Role-Based Access Instructions

### Step 1: Register Admin User

POST /api/auth/register

Body:

{ 
    "name": "Admin User", 
    "email":"admin@gmail.com",
    "password": "123456",
    "role": "admin" 
}

---

### Step 2: Login

POST `/api/auth/login`

Copy the JWT token returned.

---

### Step 3: Use Authorization Header

For all protected routes, include header ==>  Authorization: Bearer <your_token>

Only users with role `admin` can:
- Create students
- Update students
- Delete students

Users with role `student` will receive a 403 Forbidden response for restricted operations.

---

**IMP -- FIRST REGISTER WITH ADMIN ROLE , LOGIN USING ADMIN ID AND PASSWORD , COPY YTHE JWT TOKEN , THEN YOU CAN UPDATE DELETE CREATE STUDENTS** 

## 📌 API Endpoints

### 🔑 Authentication

| Method | Endpoint |
|--------|----------|
| POST   | /api/auth/register |
| POST   | /api/auth/login |

---

### 🎓 Students (Protected)

| Method | Endpoint |
|--------|----------|
| POST   | /api/students |
| GET    | /api/students?page=1&limit=5 |
| GET    | /api/students/:id |
| PUT    | /api/students/:id |
| DELETE | /api/students/:id |

---

## 🔍 Query Parameters

### Pagination

/api/students?page=1&limit=5

---

### Search by Name

/api/students?search=<name>

---

### Filter by Course

/api/students?course=Computer Science

---

### Combined Example

/api/students?search=Arjun&course=Computer Science&page=1&limit=2

---

## 🧠 Design Decisions

- JWT used for stateless authentication.
- Passwords securely hashed using bcrypt.
- Role-based access control implemented for admin-only operations.
- Pagination added for scalability.
- Search and filtering implemented for usability.
- Input validation prevents invalid data storage.
- Clean folder separation for maintainability and scalability.

---

## 📌 Assumptions

- MongoDB is running locally.
- JWT secret is securely stored in environment variables.
- Admin role must be assigned during registration to perform restricted operations.

---

## 🏁 Final Notes

- All student routes are protected using JWT middleware.
- Passwords are never stored in plain text.
- The system has been tested end-to-end including:
  - Authentication
  - Role restriction
  - CRUD operations
  - Validation
  - Pagination
  - Search & filtering.

---


