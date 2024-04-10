import React from "react";
import { Elevator, SelectData } from "../types/types";
import styles from "../styles/elevatorStatus.module.css";
import UpdateStatus from "./UpdateStatus";

interface ESProps {
  elevators: Elevator[];
  onSubmit: (data: SelectData, elevatorId: number) => void;
}

const Elevators = ({ elevators, onSubmit }: ESProps) => {
  const handleFormSubmit = (data: SelectData, elevatorId: number) => {
    onSubmit(data, elevatorId);
  };

  return (
    <div className="postition-relative">
      {elevators.map((e) => (
        <React.Fragment key={`elevator-${e.id}`}>
          <div
            key={`elevator-${e.id}-line1`}
            style={{
              position: "absolute",
              top: "0",
              left: `calc( ${e.id} * 33.33% - 172px)`,
              width: "3px",
              height: `calc(100% - ${e.currentFloor * 50 + 240}px)`,
              backgroundColor: "black",
            }}
          />
          <div
            key={`elevator-${e.id}-line2`}
            style={{
              position: "absolute",
              top: "0",
              left: `calc( ${e.id} * 33.33% - 152px)`,
              width: "3px",
              height: `calc(100% - ${e.currentFloor * 50 + 240}px)`,
              backgroundColor: "black",
            }}
          />
          <div
            key={`elevator-${e.id}-card`}
            className={`${styles.elevator} card`}
            style={{
              position: "fixed",
              bottom: `${e.currentFloor * 50 + 10}px`,
              left: `calc( ${e.id} * 33.33% - 230px)`,
            }}
          >
            <div
              className={`card-body d-flex flex-column justify-content-between`}
              style={{ width: "132px" }}
            >
              <h5 className="card-title">Elevator {e?.id}</h5>
              <p
                className={`${styles.status}`}
                style={e?.status === "idle" ? { paddingBottom: "24px" } : {}}
              >
                Status: {e?.status}
              </p>
              <p className={`${styles.destination}`}>
                Destination: {e?.destinationFloor}
              </p>
              <div className="d-flex flex-column">
                <UpdateStatus
                  onSubmit={(data) => handleFormSubmit(data, e.id)}
                />
              </div>
              <p className={`${styles.current}`}>Current: {e?.currentFloor}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Elevators;
