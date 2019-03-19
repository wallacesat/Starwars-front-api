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
          total: response.count
        })
      );
    })
    .catch(error => {
      dispatch(fetchStarshipsFailed(error));
    });
};
