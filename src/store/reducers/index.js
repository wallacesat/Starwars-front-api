import { combineReducers } from "redux";

// import dos reducers
import pagination from "./pagination";
import peoples from "./peoples";
import planets from "./planets";
import starships from "./starships";
import vehicles from "./vehicles";

// função que retorna um 'container' de reducers
export default combineReducers({
  pagination,
  peoples,
  planets,
  starships,
  vehicles
});
