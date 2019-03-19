import { planetsAction } from "../actions/actionsTypes";

export default function planets(state = null, action) {
  switch (action.type) {
    case planetsAction.FETCH_PLANETS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case planetsAction.FETCH_PLANETS_SUCCEEDED:
      return Object.assign({}, state, {
        list: [...(state.list || []), ...action.planets.results],
        isFetching: false
      });

    case planetsAction.FETCH_PLANETS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
