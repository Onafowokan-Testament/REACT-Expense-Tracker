import { useState } from "react";

interface Prop {
  allItem: {
    description: string;
    amount: number;
    category: string;
  }[];
  deleteItem: (description: String) => void;
}

const Table = ({ allItem, deleteItem }: Prop) => {
  const [selectedDesc, setSelectedDesc] = useState("");
  const [value, setValue] = useState("All categories");

  const neededData =
    value != "All categories"
      ? allItem.filter((item) => item.category === value)
      : allItem;

  return (
    <>
      <select
        className="form-select mb-3"
        aria-label="Default select example"
        id="category"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          console.log(value);
        }}
      >
        <option value="All categories">All categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {neededData.map((item) => (
            <tr>
              <td key={item["description"]}>{item["description"]}</td>
              <td key={item["amount"]}>$ {item["amount"]}</td>
              <td key={item["category"]}>{item["category"]}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedDesc(item["description"]);
                    deleteItem(selectedDesc);
                  }}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td>Total</td>
            <td>
              $ {neededData.reduce((total, item) => total + item.amount, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
