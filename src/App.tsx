import { useState } from "react";
import { FieldValues } from "react-hook-form";

import "./App.css";
import Form from "./components/form";
import Table from "./components/Table";

function App() {
  const [allItems, setAllItems] = useState([
    { description: "test", amount: 56, category: "bolu" },
  ]);

  const storeItem = (data: FieldValues) => {
    setAllItems([
      ...allItems,
      {
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
    console.log(allItems);
  };

  const deleteItem = (desc: String) => {
    setAllItems(allItems.filter((item) => item.description !== desc));
  };

  return (
    <>
      <Form newItem={storeItem}></Form>

      <Table allItem={allItems} deleteItem={deleteItem}></Table>
    </>
  );
}

export default App;
