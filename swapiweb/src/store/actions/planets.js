import { planetsAction } from "./actionsTypes";
import { getPlanets } from "../../services/api/planetsService";

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

  getPlanets()
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        fetchPlanetsSucceeded({
          results,
          page,
          pageCount
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
  getPlanets(page)
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        updatePlanetsSucceeded({
          results,
          page,
          pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updatePlanetsFailed(error));
    });
};
