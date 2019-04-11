import { starshipsAction } from "./actionsTypes";
import { getStarships } from "../../services/api/starshipsService";
import { handleResulstWithId } from "../../utils/handleResultsWithId";

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

  return getStarships()
    .then(response => {
      const { results, count } = response;
      dispatch(
        fetchStarshipsSucceeded({
          page: 1,
          results: handleResulstWithId(results, 1),
          pageCount: Math.ceil(count / 10)
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
  return getStarships(page)
    .then(response => {
      const { results, count } = response;
      dispatch(
        updateStarshipsSucceeded({
          page,
          results: handleResulstWithId(results, page),
          pageCount: Math.ceil(count / 10)
        })
      );
    })
    .catch(error => {
      dispatch(updateStarshipsFailed(error));
    });
};
