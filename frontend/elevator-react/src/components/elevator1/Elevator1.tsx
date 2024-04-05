import { Elevator } from "../../types/types";
import styles from "../../styles/elevatorStatus.module.css";
import { useForm } from "react-hook-form";
import UpdateStatus1 from "./UpdateStatus1";

interface ESProps {
  elevators: Elevator[];
  floor1: number;
  onSubmit: (data: FormData) => void;
}

const Elevator1 = ({ elevators, floor1, onSubmit }: ESProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <div className="postition-relative">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(33.33% - 172px)",
          width: "3px",
          height: `calc(100% - ${floor1 * 50 + 240}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(33.33% - 152px)",
          width: "3px",
          height: `calc(100% - ${floor1 * 50 + 240}px)`,
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
        <div className={`card-body d-flex flex-column justify-content-between`}>
          <h5 className="card-title">Elevator {elevators[0]?.id}</h5>
          <p className={`${styles.status}`}>Status: {elevators[0]?.status}</p>
          <p className={`${styles.destination}`}>
            Destination: {elevators[0]?.destinationFloor}
          </p>
          <div className="d-flex flex-column">
            <UpdateStatus1 elevators={elevators} onSubmit={handleFormSubmit} />
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[0]?.currentFloor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Elevator1;