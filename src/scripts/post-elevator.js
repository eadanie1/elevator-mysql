
import axios from 'axios';
import { pool } from "../../app.js";
import asyncLock from 'async-lock';
const lock = new asyncLock();

export let callsQueue = [];

export async function findClosestElevator(floor) {
  try {
    let closestElevator = null;
    let minDistance = Number.MAX_SAFE_INTEGER;
    
    const resultsArray = await pool.query(`
    SELECT * FROM elevators WHERE status = 'idle'
    `);
    
    const elevators = resultsArray[0];
    
    if (elevators.length === 0) {
      return;
    }
    
    for (const elevator of elevators) {
      const distance = Math.abs(elevator.currentFloor - floor);
      if (distance < minDistance) {
        minDistance = distance;
        closestElevator = elevator;
      }

      if (closestElevator && closestElevator.currentFloor === floor) {
        console.log(`Elevator ${closestElevator.id} is already at floor ${floor}`);
        return closestElevator = 0;
      }
    }

    await pool.query(`
      UPDATE elevators
      SET
        status = ${closestElevator.currentFloor < floor ? `'moving_up'` : `'moving_down'`},
        destinationFloor = ${floor}
      WHERE id = ${closestElevator.id}
    `);
        
    const closestElevatorResultsArray = await pool.query(`
      SELECT * FROM elevators WHERE id = ${closestElevator.id}
    `);

    const assignedClosestElevator = closestElevatorResultsArray[0][0];
        
    return assignedClosestElevator;
  } catch(err) {
    console.error('Error', err.message);
    throw err;
  }
}

export async function moveElevator(elevator) {
  try {
    const moveTime = Math.abs(elevator.destinationFloor - elevator.currentFloor) * 1000;
    await new Promise(resolve => setTimeout(resolve, moveTime));
    
    await pool.query(`
    UPDATE elevators
    SET
    currentFloor = ${elevator.destinationFloor},
    status = 'idle',
    destinationFloor = 0
    WHERE id = ${elevator.id}
    `);

    console.log(`Elevator ${elevator.id} reached floor ${elevator.destinationFloor}`);
    
    if (callsQueue.length > 0) {
      const call = callsQueue.shift();
      const queuedArray = [];
      queuedArray.push(call.floor);
      callElevator(queuedArray);
    }
  } catch(err) {
    console.error('Error', err.message);
    throw err;
  }
}

export async function callElevator(floors) {
  try {
    await lock.acquire('callElevatorLock', async () => {
      if (!Array.isArray(floors)) {
        console.error('Invalid input. Expected an array of floors.');
        return;
      }

      const assignedElevatorsArray = [];
      
      for (const floor of floors) {
        let closestElevator = await findClosestElevator(floor);

        if (closestElevator === 0) continue;

        if (!closestElevator) {
          callsQueue.push({ floor });
          console.log(`No idle elevators available. Call queued for floor ${floor}`);
          continue;
        }
        console.log(closestElevator);
        assignedElevatorsArray.push(closestElevator);
      }

      while (assignedElevatorsArray.length > 0) {
        const shiftedClosestElevator = assignedElevatorsArray.shift();
        moveElevator(shiftedClosestElevator); 
      }
    })
  } catch(err) {
    console.error('Error', err.message);
    throw err;
  }
}
  
  export async function callElevatorAPI(floors) {
    try {
      const response = await axios.post('http://localhost:3000/api/elevators/call', { floors: floors });
      console.log(response.data);
    } catch (error) {
      console.error('Error calling elevator API:', error.response.data);
    }
  }
  
export async function callElevatorRouteHandler(req, res) {
  try {
    const { floors } = req.body;
    if (!Array.isArray(floors)) {
      throw new Error('Invalid input. Expected an array of floors.');
    }
  
      await callElevator(floors);
  
    // res.json({ message: `Elevators called for floors ${floors.join(', ')}` });
  } catch(err) {
    console.log('Error', err.message);
    res.status(400).json({ error: err.message });
  }
}

export default { callElevatorAPI, callElevatorRouteHandler };