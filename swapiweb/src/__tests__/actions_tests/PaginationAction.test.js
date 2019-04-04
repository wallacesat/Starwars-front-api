import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { paginationAction } from "../../store/actions/actionsTypes";
import { selectPagePagination } from "../../store/actions/pagination";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Pagination Action", () => {
  it("Should create an action to change the page showed", () => {
    const page = 3;
    const expectedAction = [
      {
        type: paginationAction.PAGE_SELECTED,
        pagination: { page }
      }
    ];
    const store = mockStore({ pagination: 1 });

    store.dispatch(selectPagePagination(page));
    expect(store.getActions()).toEqual(expectedAction);
    expect(store.getActions()).toMatchSnapshot();
  });
});
