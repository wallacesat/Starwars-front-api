import { planetsAction } from "./actionsTypes";
import { getPlanets } from "../../services/api/planetsService";
import { handleResulstWithId } from "../../utils/handleResultsWithId";

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
      const { results, count } = response;
      dispatch(
        fetchPlanetsSucceeded({
          page: 1,
          results: handleResulstWithId(results, 1),
          pageCount: Math.ceil(count / 10)
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
      const { results, count } = response;
      dispatch(
        updatePlanetsSucceeded({
          page,
          results: handleResulstWithId(results, page),
          pageCount: Math.ceil(count / 10)
        })
      );
    })
    .catch(error => {
      dispatch(updatePlanetsFailed(error));
    });
};
