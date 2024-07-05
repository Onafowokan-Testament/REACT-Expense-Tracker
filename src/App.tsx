import { useState } from "react";
import { FieldValues } from "react-hook-form";

import "./App.css";
import Form from "./components/form";
import Table from "./components/Table";

function App() {
  const [expenses, setAllItems] = useState([
    { id: 1, description: "cinema", amount: 50, category: "Entertainment" },
  ]);

  const storeItem = (data: FieldValues) => {
    setAllItems([
      ...expenses,
      {
        id: expenses.length + 1,
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
    console.log(expenses);
  };

  const deleteItem = (id: number) => {
    setAllItems(expenses.filter((item) => item.id !== id));
  };

  return (
    <>
      <Form newItem={storeItem}></Form>

      <Table allItem={expenses} deleteItem={deleteItem}></Table>
    </>
  );
}

export default App;
