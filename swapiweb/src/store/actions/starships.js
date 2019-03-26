import { starshipsAction } from "./actionsTypes";
import { getStarships } from "../../services/api/starshipsService";

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

  getStarships()
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        fetchStarshipsSucceeded({
          results,
          page,
          pageCount
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
  getStarships(page)
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        updateStarshipsSucceeded({
          results,
          page,
          pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updateStarshipsFailed(error));
    });
};
