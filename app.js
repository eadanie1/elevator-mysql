
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

// pool.query(createElevatorInstances, ((err, results) => {
//   if (err) {
//     console.error('Error executing query:', err);
//     return;
//   }
//   console.log('Query results:', results);
// }));

pool.end((err) => {
  if (err) {
    console.error('Error closing pool connection', err);
    return;
  }
  console.log('Pool connection ended successfully');
})

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
    console.log(`Connected to the MySQL server, and listening on port ${port}`);
});

// export default { elevatorSchema, Elevator };