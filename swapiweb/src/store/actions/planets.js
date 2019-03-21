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
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(fetchPlanetsFailed(error));
    });
};

const updatePlanetsIsFetching = () => ({
  type: planetsAction.UPDATE_PLANETS_IS_FETCHING
});

const updatePlanetsSucceeded = planets => ({
  type: planetsAction.UPDATE_PLANETS_SUCCEEDED,
  planets
});

const updatePlanetsFailed = error => ({
  type: planetsAction.UPDATE_PLANETS_FAILED,
  error
});

export const updatePlanets = page => dispatch => {
  dispatch(updatePlanetsIsFetching());
  swapiRequest(null, page, "planets")
    .then(response => {
      dispatch(
        updatePlanetsSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updatePlanetsFailed(error));
    });
};
