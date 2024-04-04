import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ElevatorStatus from "./components/ElevatorStatus";
import { Elevator } from "./types/types";
import FloorLines from "./components/FloorLines";

function App() {
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [error, setError] = useState(null);
  const [floor1, setFloor1] = useState<number | null>(null);
  const [floor2, setFloor2] = useState<number | null>(null);
  const [floor3, setFloor3] = useState<number | null>(null);

  useEffect(() => {
    if (elevators.length > 0) {
      setFloor1(elevators[0]?.currentFloor);
      setFloor2(elevators[1]?.currentFloor);
      setFloor3(elevators[2]?.currentFloor);
    }
  }, [elevators]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/elevators")
      .then((res) => {
        setElevators([...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  // useEffect(() => {
  //   // change to dynamically reading from UpdateStatus once form setup
  //   const id = 1;
  //   // const id = 2;
  //   // const id = 3;
  //   const floor = 0;
  //   // change to dynamically reading from UpdateStatus once form setup
  //   axios
  //     .put(`http://localhost:3000/api/elevators/set-floor/${id}/${floor}`)
  //     .then((res) => {
  //       if (id === 1) {
  //         setFloor1(floor);
  //       } else if (id === 2) {
  //         setFloor2(floor);
  //       } else if (id === 3) {
  //         setFloor3(floor);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  // }, []);

  // useEffect(() => {
  //   // change to dynamically reading from CallElevator once form setup
  //   // const floors = [0, 1, 2];

  //   // also debug what double call is about in backend server
  //   axios
  //     .post(`http://localhost:3000/api/elevators/call`, { floors: floors })
  //     .then((res) => {
  //       // if (id === 1) {
  //       //   setFloor1(floor);
  //       // } else if (id === 2) {
  //       //   setFloor2(floor);
  //       // } else if (id === 3) {
  //       //   setFloor3(floor);
  //       // }
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  // }, []);

  console.log(elevators);

  return (
    <>
      <ElevatorStatus
        elevators={elevators}
        floor1={floor1}
        floor2={floor2}
        floor3={floor3}
      />
      <FloorLines />
      <small
        style={{ position: "fixed", bottom: "26px", left: "50%", zIndex: "-1" }}
      >
        Icons and images taken from icons8
      </small>
    </>
  );
}

export default App;
