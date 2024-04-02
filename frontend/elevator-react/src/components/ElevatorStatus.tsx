import { Elevator } from "../types/types";

interface ESProps {
  elevators: Elevator[];
}

const ElevatorStatus = ({ elevators }: ESProps) => {
  return (
    <>
      <h1>Status of elevators</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Current floor</th>
            <th>Status</th>
            <th>Destination floor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {elevators.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.currentFloor}</td>
              <td>{e.status}</td>
              <td>{e.destinationFloor}</td>
              <td>
                <button
                  onClick={() => console.log("hi")}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ElevatorStatus;
