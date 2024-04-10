# Elevator API - MySQL (Express.js / React)

## 1. Project Overview
- **Description:** This project provides endpoints to interact with an elevator control system API using a MySQL database. The backend is built in Node.js using Express.js, while the frontend is developed in React. The API focuses on CRUD operations, particularly reading, updating, and creating different properties of elevator objects.

## 2. Installation and Setup

### Backend
#### Requirements:
- Node.js
- npm packages: axios, express, cors, async-lock, mysql2
- Development dependencies: gulp

#### Installation:
1. Clone this repository to your local machine:
   ```
   git clone https://github.com/yourusername/your-repository.git
   ```
2. Navigate to the project directory:
   ```
   cd your-repository/elevator-mysql
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the backend server:
   ```
   node app.js
   ```
   or
   ```
   nodemon app.js
   ```
5. Access the API at http://localhost:3000/api/elevators.

### Frontend
#### Requirements:
- Node.js
- npm packages: @hookform/resolvers, axios, bootstrap, react, react-dom, react-hook-form, zod
- Development dependencies: Vite

#### Installation:
1. Navigate to the frontend folder:
   ```
   cd your-repository/elevator-mysql/frontend/elevator-react
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Access the frontend interface at http://localhost:5173.

## 3. Project Features

- CRUD operations:
  - **Read:** Get the full list and properties of all elevators, check the availability of an elevator by ID.
  - **Update:** Set the destination floor of an elevator by ID.
  - **Create (via Update):** Call the closest available elevator to respond and store requests in a queue if all elevators are in use.

## 4. Project Structure

```
/elevator-mysql
  ├── backend
  │   └── src
  │       └── ... (backend source code)
  ├── frontend
  │   ├── elevator-react
  │   │   ├── index.html
  │   │   └── src
  │   │       └── ... (frontend source code)
  ├── .gitignore
  ├── README.md
  └── ... (other project files)
```

## 5. Technologies Used

- **Languages:** JavaScript/TypeScript
- **Backend Framework:** Express.js
- **Frontend Library:** React
- **Database:** MySQL
- **Tools/Packages:** axios, async-lock, mysql2, react-hook-form, Vite
