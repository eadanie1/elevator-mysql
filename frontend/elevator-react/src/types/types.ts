
export interface Elevator {
  id: number;
  currentFloor: number;
  status: string;
  destinationFloor: number;
}

export interface PropDrill {
  onSubmit: () => void;
}