import "./App.css";
import { useEffect, useState } from "react";
import { Elevator, SelectData } from "./types/types";
import FloorLines from "./components/FloorLines";
import CallElevator, { FormSubmitData } from "./components/CallElevator";
import elevatorService from "./services/elevatorService";
import Elevators from "./components/Elevators";

function App() {
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [error, setError] = useState(null);
  const [update1, setUpdate1] = useState<SelectData | null>(null);
  const [update2, setUpdate2] = useState<SelectData | null>(null);
  const [update3, setUpdate3] = useState<SelectData | null>(null);
  const [tempUpdate, setTempUpdate] = useState<boolean>(false);
  const [floors, setFloors] = useState<number[]>([]);

  useEffect(() => {
    const { request, cancel } = elevatorService.getAll("/");

    request
      .then((res) => {
        setElevators([...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });

    return () => cancel();
  }, [tempUpdate, floors]);

  useEffect(() => {
    const movingElevators = elevators.some(
      (elevator) => elevator.destinationFloor !== 0
    );

    if (floors.length > 0 || movingElevators) {
      setTimeout(() => {
        setTempUpdate((prev) => !prev);
      }, 0);
    }
  }, [elevators, floors, tempUpdate]);

  useEffect(() => {
    if (update1 || update2 || update3) {
      let id = 0;
      let floor = 0;

      if (update1) {
        id = 1;
        floor = Number(update1.floor);
        setTempUpdate(true);
      } else if (update2) {
        id = 2;
        floor = Number(update2.floor);
        setTempUpdate(true);
      } else if (update3) {
        id = 3;
        floor = Number(update3.floor);
        setTempUpdate(true);
      }

      elevatorService
        .update(`/set-floor/${id}/${floor}`)
        .then((_) => {
          if (id === 1) {
            setUpdate1(null);
            setTempUpdate(false);
          } else if (id === 2) {
            setUpdate2(null);
            setTempUpdate(false);
          } else if (id === 3) {
            setUpdate3(null);
            setTempUpdate(false);
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
        .then((_) => {
          setFloors([]);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [floors]);

  const handleSelectSubmit = (data: SelectData, elevatorId: number) => {
    if (elevatorId === 1) {
      setUpdate1(data);
    } else if (elevatorId === 2) {
      setUpdate2(data);
    } else if (elevatorId === 3) {
      setUpdate3(data);
    }
  };

  const handleFormSubmit = (data: FormSubmitData) => {
    const floorsArray = data.floors.split(",").map((f) => Number(f));
    setFloors(floorsArray);
  };

  return (
    <>
      <Elevators elevators={elevators} onSubmit={handleSelectSubmit} />
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
