import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Prop {
  newItem: (data: FieldValues) => void;
}

const schema = z.object({
  description: z.string().min(3).max(50),
  amount: z
    .number({ invalid_type_error: "Field is required" })
    .min(0.01)
    .max(1000_000),
  category: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const Form = ({ newItem }: Prop) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          newItem(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <input
            {...register("description")}
            type="text"
            className="form-control"
            id="description"
          />

          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="Amount" className="form-label">
            Amount
          </label>

          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            className="form-control"
            id="Amount"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>

          <select
            {...register("category")}
            className="form-select"
            id="category"
          >
            <option value=""></option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary mb-5">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
