# Simple Web Application - React + Node.js
A full-stack web application with a **React frontend** and **Node.js backend**, featuring user authentication, product listing, CI/CD automation, and end-to-end testing with Playwright.

---

## Features

**Security & Authentication**
- JWT-based login with `bcryptjs` password hashing
- HTTP header protection via `Helmet` and XSS prevention via `xss-clean`
- NoSQL injection prevention with `express-mongo-sanitize`
- Rate limiting to guard against brute-force attacks

**Frontend & UI**
- Product List Page displaying names, descriptions, ratings, and images
- Fully responsive UI built with Material-UI (MUI)

**DevOps & Quality Assurance**
- End-to-end test suite powered by Playwright
- CI/CD pipeline via GitHub Actions for automated testing and deployment

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Material-UI, Axios |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT |
| Testing | Playwright |
| CI/CD | GitHub Actions |

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI
- [Git](https://git-scm.com/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tfariyah31/SimpleWebApp.git
cd SimpleWebApp
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mywebapp
JWT_SECRET=your_secret_key_here
```

> Replace `MONGO_URI` with your MongoDB Atlas connection string if using a cloud database. Use a strong, unique value for `JWT_SECRET` — never commit it to version control.

Start the backend server:

```bash
node server.js
```

The backend will be available at `http://localhost:5001`.

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`.

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
├── tests/
│   ├── login.spec.js    # Playwright Test Script for login funcionality
├── package.json         # Root project dependencies
├── playwright.config.js # Playwright Config
└── README.md            # Project documentation
```

---

## **API Endpoints**
- **POST /api/auth/register**: User registration.
  - Request Body:  
    ```json
    {
        "name": "Test User",
        "email": "user@test.com",
        "password": "password"
    }
    ```
  - Response:
    ```json
    {
        "success": true,
        "message": "User registered successfully",
        "id": "699fc2389d80a6b2843f2921",
        "email": "newuser1772077623999@testmail.com",
        "emailVerified": false,
        "name": "TestUser",
        "isBlocked": false
    } 
    ```

- **POST /api/auth/login**: User login.
  - Request Body:
    ```json
    {
      "email": "user@test.com",
      "password": "testpassword"
    }
    ```
  - Response:
    ```json
    {
        "success": true,
        "accessToken": "your-token",
        "refreshToken": "refresh-token",
        "user": {
            "id": "699f9838940ec12f1cbbea76",
            "email": "user@test.com",
            "name": "Test User"
        }
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
    {
        "success": true,
        "products": [
            {
                "name": "Product A",
                "description": "desc",
                "image": "image url",
                "rating": 4.8,
                "id": "6991383657d0c948e84dd8df"
            },
            {
                "name": "Product B",
                "description": "desc",
                "image": "imagr url",
                "rating": 4.9,
                "id": "6991383657d0c948e84dd8e0"
            }
        ]
    }
    ```

## Running Tests

End-to-end tests are run with Playwright. From the project root:

```bash
npx playwright test
```

Tests also run automatically on every push via the GitHub Actions CI/CD pipeline.

## **CI/CD Workflow with GitHub Actions**
The app includes a GitHub Actions workflow (.github/workflows/ci.yml) that:
1. Triggers on push to main
2. Spins up MongoDB with Docker
3. Installs backend, frontend & Playwright dependencies
4. Starts backend and seeds database
5. Builds & serves the React frontend
6. Waits for both servers to become available
7. Executes Playwright tests in headless Chromium


---


## 👨‍💻 Author
👤 Tasnim Fariyah
🔗 [Github](https://github.com/tfariyah31)
🔗 [LinkedIn](https://www.linkedin.com/in/tasnim-fariyah/)

---

Enjoy using the project! 🚀

---
