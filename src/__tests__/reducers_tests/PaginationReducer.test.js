import pagination from "../../store/reducers/pagination";
import { paginationAction } from "../../store/actions/actionsTypes";

describe("Testing Pagination Reducer", () => {
  it("Should return the initial state = page: 1", () => {
    expect(pagination(undefined, {})).toEqual({
      page: 1
    });
    expect(pagination(undefined, {})).not.toBeNull();
    expect(pagination(undefined, {})).not.toBeUndefined();
    expect(pagination(undefined, {})).toMatchSnapshot();
  });

  const mockAction = {
    type: paginationAction.PAGE_SELECTED,
    pagination: {
      page: 3
    }
  };

  it("Should handle PAGE_SELECTED", () => {
    expect(pagination({}, mockAction)).toEqual({
      page: 3
    });
    expect(pagination({}, mockAction)).not.toBeNull();
    expect(pagination({}, mockAction)).not.toBeUndefined();
    expect(pagination({}, mockAction)).toMatchSnapshot();
  });
});
