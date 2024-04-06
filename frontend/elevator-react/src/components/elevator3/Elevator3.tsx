import { Elevator, SelectData } from "../../types/types";
import styles from "../../styles/elevatorStatus.module.css";
import UpdateStatus3 from "./UpdateStatus3";

interface ESProps {
  elevators: Elevator[];
  floor3: number;
  onSubmit: (data: SelectData) => void;
}

const Elevator3 = ({ elevators, floor3, onSubmit }: ESProps) => {
  const handleFormSubmit = (data: SelectData) => {
    onSubmit(data);
  };

  return (
    <div className="postition-relative">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(100% - 195px)",
          width: "3px",
          height: `calc(100% - ${floor3 * 50 + 240}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(100% - 175px)",
          width: "3px",
          height: `calc(100% - ${floor3 * 50 + 240}px)`,
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
        <div
          className={`card-body d-flex flex-column justify-content-between`}
          style={{ width: "132px" }}
        >
          <h5 className="card-title">Elevator {elevators[2]?.id}</h5>
          <p
            className={`${styles.status}`}
            style={
              elevators[2]?.status === "idle" ? { paddingBottom: "24px" } : {}
            }
          >
            Status: {elevators[2]?.status}
          </p>
          <p className={`${styles.destination}`}>
            Destination: {elevators[2]?.destinationFloor}
          </p>
          <div className="d-flex flex-column">
            <UpdateStatus3 onSubmit={handleFormSubmit} />
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[2]?.currentFloor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Elevator3;
