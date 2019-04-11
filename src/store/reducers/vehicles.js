import { vehiclesAction } from "../actions/actionsTypes";

export default function vehicles(state = null, action) {
  switch (action.type) {
    case vehiclesAction.FETCH_VEHICLES_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case vehiclesAction.FETCH_VEHICLES_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...(state.pages || []),
          { page: action.vehicles.page, list: action.vehicles.results }
        ],
        pageCount: action.vehicles.pageCount,
        isFetching: false
      });

    case vehiclesAction.FETCH_VEHICLES_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case vehiclesAction.UPDATE_VEHICLES_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case vehiclesAction.UPDATE_VEHICLES_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...state.pages,
          { page: action.vehicles.page, list: action.vehicles.results }
        ],
        pageCount: action.vehicles.pageCount,
        isFetching: false
      });

    case vehiclesAction.UPDATE_VEHICLES_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
