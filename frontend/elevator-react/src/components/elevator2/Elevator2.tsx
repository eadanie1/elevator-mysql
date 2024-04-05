import { Elevator, SelectData } from "../../types/types";
import styles from "../../styles/elevatorStatus.module.css";
import { useForm } from "react-hook-form";
import UpdateStatus2 from "./UpdateStatus2";

interface ESProps {
  elevators: Elevator[];
  floor2: number;
  onSubmit: (data: SelectData) => void;
}

const Elevator2 = ({ elevators, floor2, onSubmit }: ESProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: SelectData) => {
    onSubmit(data);
  };

  return (
    <div className="postition-relative">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(66.66% - 182px)",
          width: "3px",
          height: `calc(100% - ${floor2 * 50 + 240}px)`,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "calc(66.66% - 162px)",
          width: "3px",
          height: `calc(100% - ${floor2 * 50 + 240}px)`,
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
        <div className={`card-body d-flex flex-column justify-content-between`}>
          <h5 className="card-title">Elevator {elevators[1]?.id}</h5>
          <p className={`${styles.status}`}>Status: {elevators[1]?.status}</p>
          <p className={`${styles.destination}`}>
            Destination: {elevators[1]?.destinationFloor}
          </p>
          <div className="d-flex flex-column">
            <UpdateStatus2 onSubmit={handleFormSubmit} />
          </div>
          <p className={`${styles.current}`}>
            Current: {elevators[1]?.currentFloor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Elevator2;
