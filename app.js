
import { getRoutes } from './src/scripts/get-elevator.js';
import { putRoutes } from './src/scripts/put-elevator.js';
import { callElevatorAPI, callElevatorRouteHandler } from './src/scripts/post-elevator.js';

import express from 'express';
const app = express();
app.use(express.json());

import mysql from 'mysql2';
const pool = mysql.createPool({
  host: 'localhost',
  user: 'Daniel',
  password: process.env.MYSQL_PW,
  database: 'elevators',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// pool.query('',((err, results) => {
//   if (err) {
//     console.error('Error executing query:', err);
//     return;
//   }
//   console.log('Query results:', results);
// }));

// connection.connect(function(err) {
//   if (err) {
//     console.error(`Error connecting to the MySQL server: ${err.stack}`);
//     return;
//   }
//   console.log(`Connected to the MySQL server`);
// });

// const newDatabase = 'elevators';
// const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${newDatabase}`;

// connection.query(createDatabaseQuery, function(err, results) {
//   if (err) {
//     console.error('Error creating database', err);
//     return;
//   }
//   console.log(`Database ${newDatabase} created successfully`);
// });

// connection.end(function(err) {
//   if (err) {
//     console.error(`Error closing connection: ${err.stack}`);
//     return;
//   }
//   console.log('MySQL connection closed');
// });

// mongoose.connect('mongodb://localhost/elevators')
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Unable to connect to MongoDB', err));

// export const elevatorSchema = new mongoose.Schema({
//   id: Number,
//   currentFloor: Number,
//   status: String,
//   destinationFloor: Number,
// });

// export const Elevator = mongoose.model('Elevator', elevatorSchema);

// async function createElevator(id) {
//   const elevator = new Elevator({
//     id: id,
//     currentFloor: 0,
//     status: 'idle',
//     destinationFloor: 0
//   }) 
//   const result = await elevator.save();
//   console.log(result);
// }
// createElevator(1);
// createElevator(2);
// createElevator(3);

getRoutes.forEach(route => {
  app.get(route.path, route.handler);
});

putRoutes.forEach(route => {
  app.put(route.path, route.handler);
});

app.post('/api/elevators/call', callElevatorRouteHandler);
// callElevatorAPI([10, 15, 20, 22, 23, 24]);
// callElevatorAPI([10, 20, 30, 40, 50, 60]);
// callElevatorAPI([10, 20, 30]);
// callElevatorAPI([15, 25, 35]);
// callElevatorAPI([65, 45, 75]);
// callElevatorAPI([35, 25, 55]);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// export default { elevatorSchema, Elevator };