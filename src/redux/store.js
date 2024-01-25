import { createStore, combineReducers, applyMiddleware } from "redux";
import { takeLatest, put } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import axios from "axios";

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: "Rose" },
  { id: 2, name: "Tulip" },
  { id: 3, name: "Oak" },
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case "ADD_PLANT":
      return [...state, action.payload];
    default:
      return state;
  }
};
function* fetchPlants(action) {
  try {
    const response = yield axios.get("/api/plants");
    yield put({ type: "SET_PLANTS", payload: response.data });
  } catch (err) {
    console.log("error fetching plants", err);
  }
}

function* postPlant(action) {
  try {
    yield axios.post("/api/plants", action.payload);
    yield put({ type: 'FETCH_PLANT'});
  } catch (err) {
    console.log("error posting plants", err);
  }
}

// function* deletePlant(action) {
//   try {
//     yield axios.delete(`/api/plants/${action.payload.id}`);
//     yield put({ type: "DELETE_PLANT", payload: action.payload });
//   } catch (error) {
//     console.log(error);
//   }
// }

function* rootSaga() {
  yield takeLatest("FETCH_PLANT", fetchPlants);
  yield takeLatest("ADD_PLANT", postPlant);
  // yield takeLatest("DELETE_PLANT", deletePlant);
}

const sagaMiddleware = createSagaMiddleware();
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({
    plantList,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export default store;
