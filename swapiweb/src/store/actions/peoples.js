import { peoplesAction } from "./actionsTypes";
import { swapiRequest } from "../../services/swapi_connect";

const fetchPeopleStarted = () => ({
  type: peoplesAction.FETCH_PEOPLE_STARTED
});

const fetchPeopleSucceeded = people => ({
  type: peoplesAction.FETCH_PEOPLE_SUCCEEDED,
  people
});

const fetchPeopleFailed = error => ({
  type: peoplesAction.FETCH_PEOPLE_FAILED,
  error
});

export const fetchPeople = () => dispatch => {
  dispatch(fetchPeopleStarted());

  swapiRequest(null, null)
    .then(response => {
      dispatch(
        fetchPeopleSucceeded({
          results: response.results,
          total: response.count
        })
      );
    })
    .catch(error => {
      dispatch(fetchPeopleFailed(error));
    });
};
