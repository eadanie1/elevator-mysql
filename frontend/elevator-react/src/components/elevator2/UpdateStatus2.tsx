import { useForm } from "react-hook-form";
import { SelectData } from "../../types/types";

interface USProps {
  onSubmit: (data: SelectData) => void;
}

const UpdateStatus2 = ({ onSubmit }: USProps) => {
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
      <select
        {...register("floor", { required: true })}
        name="floor"
        id=""
        className="form-select"
      >
        <option value="" hidden>
          Floor
        </option>
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
      {errors.floor && <p className="text-danger">Please select a floor</p>}
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
