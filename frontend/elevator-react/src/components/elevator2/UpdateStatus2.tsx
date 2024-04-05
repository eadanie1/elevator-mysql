import { useForm } from "react-hook-form";
import { Elevator, SelectData } from "../../types/types";

interface USProps {
  onSubmit: (data: SelectData) => void;
  elevators: Elevator[];
}

const UpdateStatus2 = ({ onSubmit, elevators }: USProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelect = (data: SelectData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSelect)}>
      <select {...register("floor")} name="floor" id="" className="form-select">
        <option value="" hidden></option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button
        style={{ width: "100%" }}
        type="submit"
        className="btn btn-secondary"
      >
        Call
      </button>
    </form>
  );
};

export default UpdateStatus2;