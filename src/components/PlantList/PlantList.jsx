import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();

  const plantList = useSelector((store) => store.plantList);

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    fetchPlant();
  }, []);

  const fetchPlant = () => {
    dispatch({ type: "FETCH_PLANT" });
  };

  return (
    <div>
      <h3>This is the plant list</h3>
      <ul>
        {plantList.map((plant, i) => (
          <li key={i}>
            {plant.name}
            {/* <button onClick={removePlant}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlantList;
