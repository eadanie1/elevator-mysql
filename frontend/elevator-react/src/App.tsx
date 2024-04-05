import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Elevator1 from "./components/elevator1/Elevator1";
import Elevator2 from "./components/elevator2/Elevator2";
import Elevator3 from "./components/elevator3/Elevator3";
import { Elevator, SelectData } from "./types/types";
import FloorLines from "./components/FloorLines";
import CallElevator from "./components/CallElevator";

function App() {
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [error, setError] = useState(null);
  const [floor1, setFloor1] = useState<number | null>(null);
  const [floor2, setFloor2] = useState<number | null>(null);
  const [floor3, setFloor3] = useState<number | null>(null);
  const [update1, setUpdate1] = useState(null);
  const [update2, setUpdate2] = useState(null);
  const [update3, setUpdate3] = useState(null);

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

  useEffect(() => {
    if (update1 || update2 || update3) {
      let id = null;
      let floor = null;

      if (update1) {
        id = 1;
        floor = Number(update1.floor);
        setElevators(
          elevators.map((e) =>
            e.id === 1
              ? {
                  ...e,
                  status: e.currentFloor < floor ? "moving_up" : "moving_down",
                  destinationFloor: floor,
                }
              : e
          )
        );
      } else if (update2) {
        id = 2;
        floor = Number(update2.floor);
        setElevators(
          elevators.map((e) =>
            e.id === 2
              ? {
                  ...e,
                  status: e.currentFloor < floor ? "moving_up" : "moving_down",
                  destinationFloor: floor,
                }
              : e
          )
        );
      } else if (update3) {
        id = 3;
        floor = Number(update3.floor);
        setElevators(
          elevators.map((e) =>
            e.id === 3
              ? {
                  ...e,
                  status: e.currentFloor < floor ? "moving_up" : "moving_down",
                  destinationFloor: floor,
                }
              : e
          )
        );
      }

      axios
        .put(`http://localhost:3000/api/elevators/set-floor/${id}/${floor}`)
        .then((res) => {
          if (id === 1) {
            setElevators(
              elevators.map((e) => (e.id === res.data.id ? res.data : e))
            );
            // setFloor1(floor);
            setUpdate1(null);
          } else if (id === 2) {
            setElevators(
              elevators.map((e) => (e.id === res.data.id ? res.data : e))
            );
            // setFloor2(floor);
            setUpdate2(null);
          } else if (id === 3) {
            setElevators(
              elevators.map((e) => (e.id === res.data.id ? res.data : e))
            );
            // setFloor3(floor);
            setUpdate3(null);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [update1, update2, update3]);

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

  const handleFormSubmit1 = (data: SelectData) => {
    setUpdate1(data);
  };

  const handleFormSubmit2 = (data: SelectData) => {
    setUpdate2(data);
  };

  const handleFormSubmit3 = (data: SelectData) => {
    setUpdate3(data);
  };

  return (
    <>
      <Elevator1
        elevators={elevators}
        floor1={floor1}
        onSubmit={handleFormSubmit1}
      />
      <Elevator2
        elevators={elevators}
        floor2={floor2}
        onSubmit={handleFormSubmit2}
      />
      <Elevator3
        elevators={elevators}
        floor3={floor3}
        onSubmit={handleFormSubmit3}
      />
      {/* <CallElevator /> */}
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
