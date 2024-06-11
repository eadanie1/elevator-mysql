import { createClient } from "@libsql/client";
import { getRoutes } from './src/scripts/get-elevator.js';
import { putRoutes } from './src/scripts/put-elevator.js';
import { callElevatorAPI, callElevatorRouteHandler } from './src/scripts/post-elevator.js';
// import dotenv from 'dotenv';
// dotenv.config();
// HOW KNOW WHERE THE LOGGING STM COMES FROM? IF REMOVE DOTENV HERE,
// IN RAILWAY PERHAPS IT WILL NOW SHOW UNDEFINED?
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.TURSO_DATABASE_URL);

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// async function setupDatabase() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS elevators (
//       id INTEGER PRIMARY KEY,
//       currentFloor INTEGER,
//       status TEXT DEFAULT 'idle',
//       destinationFloor INTEGER DEFAULT 0
//     );
//   `;
//   try {
//     await turso.execute(createTableQuery);
//     console.log('Elevators table created or already exists.');
//   } catch (error) {
//     console.error('Error creating elevators table:', error);
//   }
// }

// async function insertElevators() {
//   const elevators = [
//     { id: 1, currentFloor: 0, status: 'idle', destinationFloor: 0 },
//     { id: 2, currentFloor: 1, status: 'idle', destinationFloor: 0 },
//     { id: 3, currentFloor: 2, status: 'idle', destinationFloor: 0 },
//   ];

//   const insertQuery = `
//     INSERT INTO elevators (id, currentFloor, status, destinationFloor)
//     VALUES ($1, $2, $3, $4)
//   `;

//   for (const elevator of elevators) {
//     try {
//       await turso.execute(insertQuery, {
//         $1: elevator.id,
//         $2: elevator.currentFloor,
//         $3: elevator.status,
//         $4: elevator.destinationFloor
//       });
//       console.log(`Elevator ${elevator.id} inserted successfully.`);
//     } catch (error) {
//       console.error(`Error inserting elevator ${elevator.id}:`, error);
//     }
//   }
// }

// async function main() {
//   await setupDatabase();
//   await insertElevators();
// }

// main();

// import mysql from 'mysql2/promise';
// export const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'Daniel',
//   password: process.env.MYSQL_PW,
//   database: 'elevators',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// process.on('SIGINT', async () => {
//   try {
//     await pool.end();
//     console.log('MySQL pool connection closed.');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error closing MySQL pool connection:', err);
//     process.exit(1);
//   }
// });

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
// app.listen(port, () => {
//     console.log(`MySQL pool connection established. Listening on port ${port}.`);
// });
app.listen(port, () => {
    console.log(`Turso DB connection established. Listening on port ${port}.`);
});

// export default { pool };