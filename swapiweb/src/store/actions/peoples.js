import { peoplesAction } from "./actionsTypes";
import { swapiRequest } from "../../services/swapi_connect";
import { getPeople } from "../../services/api/peopleService";

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

  getPeople()
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        fetchPeopleSucceeded({
          results,
          page,
          pageCount
        })
      );
    })
    .catch(error => {
      dispatch(fetchPeopleFailed(error));
    });
};

const updatePeopleIsFetching = () => ({
  type: peoplesAction.UPDATE_PEOPLE_IS_FETCHING
});

const updatePeopleSucceeded = people => ({
  type: peoplesAction.UPDATE_PEOPLE_SUCCEEDED,
  people
});

const updatePeopleFailed = error => ({
  type: peoplesAction.UPDATE_PEOPLE_FAILED,
  error
});

export const updatePeople = page => dispatch => {
  dispatch(updatePeopleIsFetching());

  getPeople(page)
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        updatePeopleSucceeded({
          results,
          page,
          pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updatePeopleFailed(error));
    });
};
