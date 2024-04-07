
import { getRoutes } from './src/scripts/get-elevator.js';
import { putRoutes } from './src/scripts/put-elevator.js';
import { callElevatorAPI, callElevatorRouteHandler } from './src/scripts/post-elevator.js';
import cors from 'cors';

import express from 'express';
const app = express();
app.use(express.json());
app.use(cors());

import mysql from 'mysql2/promise';
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'Daniel',
  password: process.env.MYSQL_PW,
  database: 'elevators',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('MySQL pool connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MySQL pool connection:', err);
    process.exit(1);
  }
});

getRoutes.forEach(route => {
  app.get(route.path, route.handler);
});

putRoutes.forEach(route => {
  app.patch(route.path, route.handler);
});

app.post('/api/elevators/call', callElevatorRouteHandler);
// callElevatorAPI([10, 15, 20, 22, 23, 24]);
// callElevatorAPI([10, 20, 30, 40, 50, 60]);
// callElevatorAPI([4, 6, 8, 10]);
// callElevatorAPI([4, 6, 8, 10, 12]);
// callElevatorAPI([2, 3, 4, 5]);
// callElevatorAPI([1, 2, 3, 4]);
// callElevatorAPI([10, 20, 30]);
// callElevatorAPI([15, 25, 35]);
// callElevatorAPI([65, 45, 75]);
// callElevatorAPI([35, 25, 55]);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`MySQL pool connection established. Listening on port ${port}.`);
});

export default { pool };