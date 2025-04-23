# **Simple Web Application with React Frontend and Node.js Backend**

This is a simple web application with a **React frontend** and a **Node.js backend**. It includes user authentication (login functionality) and a product list page. The backend uses Express.js and MongoDB, while the frontend is built with React and Material-UI.

---

## **Features**
- **User Authentication**:
  - Login functionality with JWT (JSON Web Token) for secure authentication.
- **Product List**:
  - Displays a list of products with details (name, description, image, and rating).
- **Responsive Design**:
  - Built with Material-UI for a clean and modern user interface.

---

## **Technologies Used**
- **Frontend**:
  - React
  - Material-UI (MUI)
  - Axios (for API calls)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - Mongoose (for MongoDB object modeling)
  - JWT (for authentication)
- **Tools**:
  - Concurrently (to run frontend and backend simultaneously)

---

## **Prerequisites**
Before running the project, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for a cloud database)
- [Git](https://git-scm.com/)

---

## **Getting Started**

Follow these steps to set up and run the project on your local machine.

### **1. Clone the Repository**
Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### **2. Set Up the Backend**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mywebapp
   JWT_SECRET=mysecretkey
   ```
   - Replace `mongodb://localhost:27017/mywebapp` with your MongoDB connection string (e.g., MongoDB Atlas URI if using a cloud database).
4. Start the backend server:
   ```bash
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

---

### **3. Set Up the Frontend**
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

### **4. Run Both Frontend and Backend Simultaneously**
To run both the frontend and backend servers simultaneously, use `concurrently`:
1. Navigate to the root directory of the project:
   ```bash
   cd ..
   ```
2. Install `concurrently` (if not already installed):
   ```bash
   npm install concurrently --save-dev
   ```
3. Start both servers:
   ```bash
   npm start
   ```
   - The backend will run on `http://localhost:5000`.
   - The frontend will run on `http://localhost:3000`.

---

## **Project Structure**
```
my-web-app/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Backend entry point
│   └── .env             # Environment variables
├── frontend/
│   ├── public/          # Static assets
│   ├── src/             # React components and logic
│   ├── package.json     # Frontend dependencies
│   └── ...              # Other frontend files
├── package.json         # Root project dependencies
└── README.md            # Project documentation
```

---

## **API Endpoints**
- **POST /api/auth/login**: User login.
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```
  - Response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **GET /api/products**: Fetch product list (requires authentication).
  - Headers:
    ```json
    {
      "Authorization": "Bearer <your-jwt-token>"
    }
    ```
  - Response:
    ```json
    [
      {
        "_id": "65f8c8f1e4b0a1a2b3c4d5e6",
        "name": "Product 1",
        "description": "This is product 1",
        "image": "https://via.placeholder.com/150",
        "rating": 4.5
      },
      {
        "_id": "65f8c8f1e4b0a1a2b3c4d5e7",
        "name": "Product 2",
        "description": "This is product 2",
        "image": "https://via.placeholder.com/150",
        "rating": 3.8
      }
    ]
    ```

---


## 👨‍💻 Author
👤 Tasnim Fariyah
🔗 [Github](https://github.com/tfariyah31)
🔗 [LinkedIn](https://www.linkedin.com/in/tasnim-fariyah/)

---

Enjoy using the project! 🚀

---
