import { useForm } from "react-hook-form";

interface USProps {
  onSubmit: () => void;
}

const UpdateStatus = ({ onSubmit }: USProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelect = () => {
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleSelect)}>
      <select name="" id="" className="form-select">
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

export default UpdateStatus;
