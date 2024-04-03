import { Elevator } from "../types/types";
import styles from "../styles/elevatorStatus.module.css";

interface ESProps {
  elevators: Elevator[];
  floor1: number;
  floor2: number;
  floor3: number;
}

const ElevatorStatus = ({ elevators, floor1, floor2, floor3 }: ESProps) => {
  console.log(elevators);

  return (
    <div className="d-flex">
      <div
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor1 * 50 + 10}px`,
          left: "22%",
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
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor2 * 50 + 10}px`,
          left: "44%",
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
        className={`${styles.elevator} card`}
        style={{
          position: "fixed",
          bottom: `${floor3 * 50 + 10}px`,
          left: "66%",
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
