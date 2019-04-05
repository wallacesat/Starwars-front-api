import { paginationAction } from "../actions/actionsTypes";

export default function pagination(state = { page: 1 }, action) {
  switch (action.type) {
    case paginationAction.PAGE_SELECTED:
      return Object.assign({}, state, {
        page: action.pagination.page
      });

    default:
      return state;
  }
}
