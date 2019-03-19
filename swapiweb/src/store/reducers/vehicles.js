import { vehiclesAction } from "../actions/actionsTypes";

export default function vehicles(state = null, action) {
  switch (action.type) {
    case vehiclesAction.FETCH_VEHICLES_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case vehiclesAction.FETCH_VEHICLES_SUCCEEDED:
      return Object.assign({}, state, {
        list: [...(state.list || []), ...action.vehicles.results],
        isFetching: false
      });

    case vehiclesAction.FETCH_VEHICLES_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
