import "./App.css";
import { useEffect, useState } from "react";
import Elevator1 from "./components/elevator1/Elevator1";
import Elevator2 from "./components/elevator2/Elevator2";
import Elevator3 from "./components/elevator3/Elevator3";
import { Elevator, SelectData } from "./types/types";
import FloorLines from "./components/FloorLines";
import CallElevator, { FormSubmitData } from "./components/CallElevator";
import elevatorService from "./services/elevatorService";

function App() {
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [error, setError] = useState(null);
  const [floor1, setFloor1] = useState<number>(0);
  const [floor2, setFloor2] = useState<number>(0);
  const [floor3, setFloor3] = useState<number>(0);
  const [update1, setUpdate1] = useState<SelectData | null>(null);
  const [update2, setUpdate2] = useState<SelectData | null>(null);
  const [update3, setUpdate3] = useState<SelectData | null>(null);
  const [floors, setFloors] = useState<number[]>([]);

  const fetchData = () => {
    const { request, cancel } = elevatorService.getAll("/");
    request
      .then((res) => {
        setElevators(res.data);
        setFloor1(res.data[0]?.currentFloor);
        setFloor2(res.data[1]?.currentFloor);
        setFloor3(res.data[2]?.currentFloor);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (update1 || update2 || update3) {
      let id = 0;
      let floor = 0;

      if (update1) {
        id = 1;
        floor = Number(update1.floor);
      } else if (update2) {
        id = 2;
        floor = Number(update2.floor);
      } else if (update3) {
        id = 3;
        floor = Number(update3.floor);
      }

      elevatorService
        .update(`/set-floor/${id}/${floor}`)
        .then((res) => {
          if (id === 1) {
            setUpdate1(null);
          } else if (id === 2) {
            setUpdate2(null);
          } else if (id === 3) {
            setUpdate3(null);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [update1, update2, update3]);

  useEffect(() => {
    if (floors.length > 0) {
      elevatorService
        .editSeveral(`/call`, { floors: floors })
        .then((res) => {
          setFloors([]);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [floors]);

  const handleSelectSubmit1 = (data: SelectData) => {
    setUpdate1(data);
  };

  const handleSelectSubmit2 = (data: SelectData) => {
    setUpdate2(data);
  };

  const handleSelectSubmit3 = (data: SelectData) => {
    setUpdate3(data);
  };

  const handleFormSubmit = (data: FormSubmitData) => {
    const floorsArray = data.floors.split(",").map((f) => Number(f));
    setFloors(floorsArray);
  };

  return (
    <>
      <Elevator1
        elevators={elevators}
        floor1={floor1}
        onSubmit={handleSelectSubmit1}
      />
      <Elevator2
        elevators={elevators}
        floor2={floor2}
        onSubmit={handleSelectSubmit2}
      />
      <Elevator3
        elevators={elevators}
        floor3={floor3}
        onSubmit={handleSelectSubmit3}
      />
      <CallElevator onSubmit={handleFormSubmit} />
      <FloorLines />
      <small
        style={{ position: "fixed", bottom: "26px", left: "50%", zIndex: "-1" }}
      >
        Icons taken from icons8
      </small>
    </>
  );
}

export default App;
