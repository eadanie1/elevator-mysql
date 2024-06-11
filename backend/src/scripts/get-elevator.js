
// import { pool } from "../../app.js";
import { turso } from "../../app.js";

export async function statusAllElevators(req, res) {
  try {
    // const result = await pool.query('SELECT * FROM elevators');
    const result = await turso.execute('SELECT * FROM elevators');
    return result[0];
  }
  catch(error) {
    console.error('Error retrieving collection', error);
    throw error;
  }
}

export async function isElevatorAvailable(id, req, res) {
  try {
    // const elevator = await pool.query(`
    //   SELECT * FROM elevators WHERE id = ${id}
    // `);
    const elevator = await turso.execute(`
      SELECT * FROM elevators WHERE id = ${id}
    `);
    
    (elevator[0][0]).status === 'idle' ? console.log(`Elevator ${id} is available for a new call`) : 
    console.log(`Elevator ${id} is busy, please wait for the next idle elevator`);
    res.json(elevator[0][0]);
  }
  catch(error) {
    console.error('Error', error)
  }
}

export const getRoutes = [
  {
    path: '/api/elevators',
    handler: async (req, res) => {
      const elevatorsList = await statusAllElevators(req, res);
      res.json(elevatorsList);
    }
  },
  {
    path: '/api/elevators/get-status/:id',
    handler: async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        await isElevatorAvailable(id, req, res);
      }
      catch(error) {
        console.error('Error', error.message);
      }
    }
  }
];

export default { statusAllElevators, isElevatorAvailable, getRoutes };