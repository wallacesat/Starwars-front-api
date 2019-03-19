import { planetsAction } from "./actionsTypes";
import { swapiRequest } from "../../services/swapi_connect";

const fetchPlanetsStarted = () => ({
  type: planetsAction.FETCH_PLANETS_STARTED
});

const fetchPlanetsSucceeded = planets => ({
  type: planetsAction.FETCH_PLANETS_SUCCEEDED,
  planets
});

const fetchPlanetsFailed = error => ({
  type: planetsAction.FETCH_PLANETS_FAILED,
  error
});

export const fetchPlanets = () => dispatch => {
  dispatch(fetchPlanetsStarted());

  swapiRequest(null, null, "planets")
    .then(response => {
      dispatch(
        fetchPlanetsSucceeded({
          results: response.results,
          total: response.count
        })
      );
    })
    .catch(error => {
      dispatch(fetchPlanetsFailed(error));
    });
};
