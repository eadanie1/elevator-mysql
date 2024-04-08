# Elevator API - MySQL (Express.js / React)

## 1. Project Overview

- **Project Name:** Daniel's elevator MySQL API v2.0.0
- **Description:** This project supplies endpoints to interact with an elevator control system API, via a MySQL database, built in Node using Express.js, whereas the frontend is built in React. My API focuses on the app.get, app.patch and app.post (read, update and create in CRUD) operations as the important features are to read, update and create different properties of the elevator objects.

## 2. Installation and Setup

- **Requirements:**
  Backend: The npm dependency packages are:
  axios, express, cors, async-lock and mysql2 (with versions as per the package.json), as well as a set of gulp development dependencies found in the package.json file.
  Frontend: The npm dependency packages are:
  @hookform/resolvers,
  axios,
  bootstrap,
  react,
  react-dom,
  react-hook-form,
  zod,
  as well as a set of development dependencies automatically assigned by Vite.

- **Installation:**
  Backend:To setup the backend api, use your preferred code editor (after having changed directory to the folder of the downloaded project), and in the terminal run: npm i. This will install all the necessary packages in the downloaded project folder. Next navigate to the root folder, where the app.js file is located, and run node app.js (or nodemon app.js for persistent server). In your browser you can now go to http://localhost:3000/api/elevators to see the list of elevators.
  Frontend: navigate to the frontend folder via terminal command (depending on where you are currently located): cd ../frontend/elevator-react. Here run: npm i (to install all necessary packages). Next run: npm run dev (to start development server). Now you can open you browser and go to: http://localhost:5173 (the assigned port for Vite projects). Now you are good to go with using the visual interface on port 5173 to interact with the backend, by editing/viewing elevators.

## 3. Project Features

- As mentioned the CRUD operations touched on in this API are Read and Update (and post, but through updating), or as explained in a bit more detail below, app.get and app.patch (methods of the app instance of express.js). I have created and stored the elevators as objects in a MySQL table, with properties such as id, currentFloor, status (initialized as idle) and destinationFloor. The user can then access and change the properties by requesting a destinationFloor, as well as calling an array of floors, where the closest available elevators are called to service.
- **app.get:** One app.get endpoint gets the full list and properties of all elevators, another checks the availability of an elevator with a given ID.
- **app.patch:** Here the endpoint simply sets the destinationFloor of an elevator with a given ID.
- **app.post:** Here one endpoint calls on the closest available elevator to respond, which also stores in a queue a request if all elevators are in use.

## 4. Project Structure

The project is organized into the following directories:
/elevator-mysql - this is the main directory for the project, the following files are included in the main folder:

- ./backend
- ./src - all source code for the backend
- ...

- ./frontend
- ./elevator-react - main Vite folder for the React/frontend portion
- index.html - main html file that the React components link into
- ./src - all source code for the React portion
- .gitignore
- README.md - This README file
- ...

- backend and frontend:
  ./node_modules - contains the downloaded modules/packages for the project to run - however excluded from the respository due to space and not necessary as the package.json file is included.

## 5. Technologies Used

- **Languages:** JavaScript/TypeScript
- **Frameworks/libraries:** Express.js, React
- **Tools/packages:** mysql2, axios, async-lock, react
