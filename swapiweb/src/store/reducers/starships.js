import { starshipsAction } from "../actions/actionsTypes";

export default function starships(state = null, action) {
  switch (action.type) {
    case starshipsAction.FETCH_STARSHIPS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case starshipsAction.FETCH_STARSHIPS_SUCCEEDED:
      return Object.assign({}, state, {
        list: [...(state.list || []), ...action.starships.results],
        isFetching: false
      });

    case starshipsAction.FETCH_STARSHIPS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
