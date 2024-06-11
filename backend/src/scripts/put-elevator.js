
// import { pool } from "../../app.js";
import { turso } from "../../app.js";
import asyncLock from 'async-lock';
const lock = new asyncLock();

export async function findElevator(id, destinationFloor, req, res) {
  // const elevator = await pool.query(`
  //   SELECT *
  //   FROM elevators
  //   WHERE id = ${id}
  // `);
  const elevator = await turso.execute(`
    SELECT *
    FROM elevators
    WHERE id = ${id}
  `);
  
  if (elevator[0].length === 0) {
      console.log('No elevator found, please double check the ID no and try again');
      res.json({message: 'No elevator found, please double check the ID no and try again'})
      return;
  };
  
  if (elevator[0][0].currentFloor === destinationFloor) {
      console.log(`Elevator ${id} is already at floor ${destinationFloor}`);
      res.json({message: `Elevator ${id} is already at floor ${destinationFloor}`});
      return;
  };

  return elevator;
}

export async function updateElevatorStatus(id, destinationFloor, req, res) {
  try {
    await lock.acquire('updateElevatorLock', async () => {
      const foundElevator = await findElevator(id, destinationFloor, req, res);

      if (!foundElevator) {
        return;
      }
      
      // await pool.query(`
      //   UPDATE elevators
      //   SET
      //     status = ${foundElevator[0][0].currentFloor < destinationFloor ? `'moving_up'` : `'moving_down'`},
      //     destinationFloor = ${destinationFloor}
      //   WHERE id = ${id}
      // `);
      await turso.execute(`
        UPDATE elevators
        SET
          status = ${foundElevator[0][0].currentFloor < destinationFloor ? `'moving_up'` : `'moving_down'`},
          destinationFloor = ${destinationFloor}
        WHERE id = ${id}
      `);
      
      console.log(`Elevator ${id} is called for floor ${destinationFloor}`);
      
      const moveTime = Math.abs(destinationFloor - foundElevator[0][0].currentFloor) * 1000;
      await new Promise(resolve => setTimeout(resolve, moveTime));
      
      // await pool.query(`
      //   UPDATE elevators
      //   SET
      //     currentFloor = ${destinationFloor},
      //     status = 'idle',
      //     destinationFloor = 0
      //   WHERE id = ${id}
      // `);
      await turso.execute(`
        UPDATE elevators
        SET
          currentFloor = ${destinationFloor},
          status = 'idle',
          destinationFloor = 0
        WHERE id = ${id}
      `);

      const updatedElevator = {...foundElevator[0][0], currentFloor: destinationFloor};
      
      console.log(`Elevator ${id} has reached floor ${destinationFloor}`);
      // res.json(`Elevator ${id} has reached floor ${destinationFloor}`);
      return res.json(updatedElevator);
    });
  } catch(error) {
    console.error('Could not perform task', error)
  }
}

export const putRoutes = [
  {
    path: '/api/elevators/set-floor/:id/:floor',
    handler: async (req, res) => {
      try {
        const id = req.params.id;
        const destinationFloor = req.params.floor;
        await updateElevatorStatus(id, destinationFloor, req, res);
      }
      catch(error) {
        console.error('Error', error.message);
      }
    }
  }
];

export default { putRoutes };