import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ElevatorStatus from "./components/ElevatorStatus";
import { Elevator } from "./types/types";

function App() {
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [error, setError] = useState(null);

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

  return (
    <>
      <ElevatorStatus elevators={elevators} />
      <small>Icons and images taken from icons8</small>
    </>
  );
}

export default App;
