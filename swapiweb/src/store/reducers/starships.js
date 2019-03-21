import { starshipsAction } from "../actions/actionsTypes";

export default function starships(state = null, action) {
  switch (action.type) {
    case starshipsAction.FETCH_STARSHIPS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case starshipsAction.FETCH_STARSHIPS_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...(state.pages || []),
          { page: action.starships.page, list: action.starships.results }
        ],
        pageCount: action.starships.pageCount,
        isFetching: false
      });

    case starshipsAction.FETCH_STARSHIPS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case starshipsAction.UPDATE_STARSHIPS_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case starshipsAction.UPDATE_STARSHIPS_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...(state.pages || []),
          { page: action.starships.page, list: action.starships.results }
        ],
        pageCount: action.starships.pageCount,
        isFetching: false
      });

    case starshipsAction.UPDATE_STARSHIPS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
