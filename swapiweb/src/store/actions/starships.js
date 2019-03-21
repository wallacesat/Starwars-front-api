import { starshipsAction } from "./actionsTypes";
import { swapiRequest } from "../../services/swapi_connect";

const fetchStarshipsStarted = () => ({
  type: starshipsAction.FETCH_STARSHIPS_STARTED
});

const fetchStarshipsSucceeded = starships => ({
  type: starshipsAction.FETCH_STARSHIPS_SUCCEEDED,
  starships
});

const fetchStarshipsFailed = error => ({
  type: starshipsAction.FETCH_STARSHIPS_FAILED,
  error
});

export const fetchStarships = () => dispatch => {
  dispatch(fetchStarshipsStarted());

  swapiRequest(null, null, "starships")
    .then(response => {
      dispatch(
        fetchStarshipsSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(fetchStarshipsFailed(error));
    });
};

const updateStarshipsIsFetching = () => ({
  type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING
});

const updateStarshipsSucceeded = starships => ({
  type: starshipsAction.UPDATE_STARSHIPS_SUCCEEDED,
  starships
});

const updateStarshipsFailed = error => ({
  type: starshipsAction.UPDATE_STARSHIPS_FAILED,
  error
});

export const updateStarships = page => dispatch => {
  dispatch(updateStarshipsIsFetching());
  swapiRequest(null, page, "starships")
    .then(response => {
      dispatch(
        updateStarshipsSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updateStarshipsFailed(error));
    });
};
