import { peoplesAction } from "../actions/actionsTypes";

export default function peoples(state = null, action) {
  switch (action.type) {
    case peoplesAction.FETCH_PEOPLE_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case peoplesAction.FETCH_PEOPLE_SUCCEEDED:
      return Object.assign({}, state, {
        list: [...(state.list || []), ...action.people.results],
        isFetching: false
      });

    case peoplesAction.FETCH_PEOPLE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
