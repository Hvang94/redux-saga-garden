import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PlantForm = () => {
  const dispatch = useDispatch();

  //Initial state is an OBJECT, with keys id and name
  let [newPlant, setNewPlant] = useState('');

  const fetchPlant = (event) => {
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setNewPlant(event.target.value);
    dispatch({ type: "FETCH_PLANT" });
  };

  const addNewPlant = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_PLANT", payload: newPlant });
    //updates the next plant to have a new id
    // setNewPlant({ id: newPlant.id + 1, name: "" });
  };
  return (
    <div>
      <h3>This is the form</h3>
      <pre>{JSON.stringify(newPlant)}</pre>
      <form onSubmit={addNewPlant}>
        <input type="text" value={newPlant.name} onChange={fetchPlant} />
        <input type="submit" value="Add New Plant" />
      </form>
    </div>
  );
};

export default PlantForm;
