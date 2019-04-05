import { peoplesAction } from "./actionsTypes";
import { getPeople } from "../../services/api/peopleService";
import { handleResulstWithId } from "../../utils/handleResultsWithId";

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

  return getPeople()
    .then(response => {
      const { results, count } = response;
      dispatch(
        fetchPeopleSucceeded({
          page: 1,
          results: handleResulstWithId(results, 1),
          pageCount: Math.ceil(count / 10)
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
      const { results, count } = response;
      dispatch(
        updatePeopleSucceeded({
          page,
          results: handleResulstWithId(results, page),
          pageCount: Math.ceil(count / 10)
        })
      );
    })
    .catch(error => {
      dispatch(updatePeopleFailed(error));
    });
};
