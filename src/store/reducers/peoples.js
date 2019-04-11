import { peoplesAction } from "../actions/actionsTypes";

export default function peoples(state = null, action) {
  switch (action.type) {
    case peoplesAction.FETCH_PEOPLE_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case peoplesAction.FETCH_PEOPLE_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...(state.pages || []),
          { page: action.people.page, list: action.people.results }
        ],
        pageCount: action.people.pageCount,
        isFetching: false
      });

    case peoplesAction.FETCH_PEOPLE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case peoplesAction.UPDATE_PEOPLE_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case peoplesAction.UPDATE_PEOPLE_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...state.pages,
          { page: action.people.page, list: action.people.results }
        ],
        pageCount: action.people.pageCount,
        isFetching: false
      });

    case peoplesAction.UPDATE_PEOPLE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
