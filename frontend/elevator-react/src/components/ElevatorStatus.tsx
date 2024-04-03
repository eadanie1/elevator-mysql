import { Elevator } from "../types/types";
import styles from "../styles/elevatorStatus.module.css";
import ElevatorCables from "./ElevatorCables";

interface ESProps {
  elevators: Elevator[];
  floor1: number;
  floor2: number;
  floor3: number;
}

const ElevatorStatus = ({ elevators, floor1, floor2, floor3 }: ESProps) => {
  console.log(elevators);

  return (
    <div className="postition-relative">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(33.33% - 150px)",
          width: "3px",
          height: `calc(100% - ${floor1 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(33.33% - 130px)",
          width: "3px",
          height: `calc(100% - ${floor1 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor1 * 50 + 10}px`,
          left: "calc(33.33% - 230px)",
        }}
      >
        <img
          src={`/src/images/elevator-image.jpg`}
          className="card-img-top"
          style={{ width: "170px" }}
          alt={`Elevator image`}
        />
        <div className={`card-body d-flex flex-column justify-content-between`}>
          <h5 className="card-title">Elevator {elevators[0]?.id}</h5>
          <p>Status: {elevators[0]?.status}</p>
          <p>Destination: {elevators[0]?.destinationFloor}</p>
          <div className="d-flex justify-content-between mt-2">
            <form action="">
              <label htmlFor="" className="form-label"></label>
              <select name="" id="" className="form-select"></select>
            </form>
            {/* <button key={`swap-${e.id}`} className={` btn`}>
                      Swap
                      </button>
                      <button key={`delete-${e.id}`} className={` btn`}>
                      Delete
                    </button> */}
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[0]?.currentFloor}
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(66.66% - 160px)",
          width: "3px",
          height: `calc(100% - ${floor2 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(66.66% - 140px)",
          width: "3px",
          height: `calc(100% - ${floor2 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor2 * 50 + 10}px`,
          left: "calc(66.66% - 240px)",
        }}
      >
        <img
          src={`/src/images/elevator-image.jpg`}
          className="card-img-top"
          style={{ width: "170px" }}
          alt={`Elevator image`}
        />
        <div className={`card-body d-flex flex-column justify-content-between`}>
          <h5 className="card-title">Elevator {elevators[1]?.id}</h5>
          <p>Status: {elevators[1]?.status}</p>
          <p>Destination: {elevators[1]?.destinationFloor}</p>
          <div className="d-flex justify-content-between mt-2">
            <form action="">
              <label htmlFor="" className="form-label"></label>
              <select name="" id="" className="form-select"></select>
            </form>
            {/* <button key={`swap-${e.id}`} className={` btn`}>
                      Swap
                      </button>
                      <button key={`delete-${e.id}`} className={` btn`}>
                      Delete
                    </button> */}
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[1]?.currentFloor}
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(100% - 170px)",
          width: "3px",
          height: `calc(100% - ${floor3 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(100% - 150px)",
          width: "3px",
          height: `calc(100% - ${floor3 * 50 + 365}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor3 * 50 + 10}px`,
          left: "calc(100% - 250px)",
        }}
      >
        <img
          src={`/src/images/elevator-image.jpg`}
          className="card-img-top"
          style={{ width: "170px" }}
          alt={`Elevator image`}
        />
        <div className={`card-body d-flex flex-column justify-content-between`}>
          <h5 className="card-title">Elevator {elevators[2]?.id}</h5>
          <p>Status: {elevators[2]?.status}</p>
          <p>Destination: {elevators[2]?.destinationFloor}</p>
          <div className="d-flex justify-content-between mt-2">
            <form action="">
              <label htmlFor="" className="form-label"></label>
              <select name="" id="" className="form-select"></select>
            </form>
            {/* <button key={`swap-${e.id}`} className={` btn`}>
                      Swap
                      </button>
                      <button key={`delete-${e.id}`} className={` btn`}>
                      Delete
                    </button> */}
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[2]?.currentFloor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElevatorStatus;
