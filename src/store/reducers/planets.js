import { planetsAction } from "../actions/actionsTypes";

export default function planets(state = null, action) {
  switch (action.type) {
    case planetsAction.FETCH_PLANETS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      });

    case planetsAction.FETCH_PLANETS_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...(state.pages || []),
          { page: action.planets.page, list: action.planets.results }
        ],
        pageCount: action.planets.pageCount,
        isFetching: false
      });

    case planetsAction.FETCH_PLANETS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case planetsAction.UPDATE_PLANETS_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case planetsAction.UPDATE_PLANETS_SUCCEEDED:
      return Object.assign({}, state, {
        pages: [
          ...state.pages,
          { page: action.planets.page, list: action.planets.results }
        ],
        pageCount: action.planets.pageCount,
        isFetching: false
      });

    case planetsAction.UPDATE_PLANETS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
