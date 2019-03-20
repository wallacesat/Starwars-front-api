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
      console.log(response);

      dispatch(
        fetchPeopleSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(fetchPeopleFailed(error));
    });
};

const updatePeopleSucceeded = people => ({
  type: peoplesAction.UPDATE_PEOPLE_SUCCEED,
  people
});

const updatePeopleFailed = error => ({
  type: peoplesAction.UPDATE_PEOPLE_FAILED,
  error
});

export const updatePeople = page => dispatch => {
  swapiRequest(null, page, null)
    .then(response => {
      dispatch(
        updatePeopleSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updatePeopleFailed(error));
    });
};
