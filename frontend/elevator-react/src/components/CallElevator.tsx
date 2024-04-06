import { useForm } from "react-hook-form";
import { number, z } from "zod";

interface CEProps {
  onSubmit: (data: FormSubmitData) => void;
}

const schema = z.array(z.number());

export type FormSubmitData = z.infer<typeof schema>;

const CallElevator = ({ onSubmit }: CEProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data: FormSubmitData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="d-flex align-items-center"
    >
      <label
        htmlFor="floors"
        className="form-label"
        style={{ height: "16px", marginRight: "8px" }}
      >
        Floors
      </label>
      <input
        {...register("floors")}
        id="floors"
        type="text"
        className="form-control"
      />
      <button className="btn btn-secondary" style={{ marginLeft: "8px" }}>
        Call
      </button>
    </form>
  );
};

export default CallElevator;
