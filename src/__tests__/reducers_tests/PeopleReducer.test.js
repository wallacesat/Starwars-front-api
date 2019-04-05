import peoples from "../../store/reducers/peoples";
import { peoplesAction } from "../../store/actions/actionsTypes";

const mockActionSucceeded = {
  type: peoplesAction.FETCH_PEOPLE_SUCCEEDED,
  people: {
    page: 1,
    results: [{}],
    pageCount: 4
  }
};

const mockActionFailed = {
  type: peoplesAction.FETCH_PEOPLE_FAILED,
  error: "Error to Fetching people"
};

const mockPreviousState = {
  pages: [{ page: 1, list: [{}] }],
  pageCount: 4,
  isFetching: false
};

const mockActionUpdateSucceeded = {
  type: peoplesAction.UPDATE_PEOPLE_SUCCEEDED,
  people: {
    page: 2,
    results: [{}, {}],
    pageCount: 4
  }
};

const mockActionUpdateFailed = {
  type: peoplesAction.UPDATE_PEOPLE_FAILED,
  error: "Error to Fetching Update people"
};

describe("Testing People Reducer", () => {
  it("Should return initial state = null", () => {
    expect(peoples(undefined, {})).toBeNull();
    expect(peoples(undefined, {})).toMatchSnapshot();
  });

  it("Should handle FETCH_PEOPLE_STARTED", () => {
    expect(peoples(null, { type: peoplesAction.FETCH_PEOPLE_STARTED })).toEqual(
      { isFetching: true }
    );
    expect(
      peoples(null, { type: peoplesAction.FETCH_PEOPLE_STARTED })
    ).not.toBeNull();
    expect(
      peoples(null, { type: peoplesAction.FETCH_PEOPLE_STARTED })
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_PEOPLE_SUCCEEDED", () => {
    expect(peoples({ isFetching: true }, mockActionSucceeded)).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 4,
      isFetching: false
    });
    expect(peoples({ isFetching: true }, mockActionSucceeded)).not.toBeNull();
    expect(
      peoples({ isFetching: true }, mockActionSucceeded)
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_PEOPLE_FAILED", () => {
    expect(peoples({ isFetching: true }, mockActionFailed)).toEqual({
      error: "Error to Fetching people",
      isFetching: false
    });
    expect(peoples({ isFetching: true }, mockActionFailed)).not.toBeNull();
    expect(peoples({ isFetching: true }, mockActionFailed)).toMatchSnapshot();
  });

  it("Should handle UPDATE_PEOPLE_IS_FETCHING", () => {
    expect(
      peoples(mockPreviousState, {
        type: peoplesAction.UPDATE_PEOPLE_IS_FETCHING
      })
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 4,
      isFetching: true
    });
    expect(
      peoples(mockPreviousState, {
        type: peoplesAction.UPDATE_PEOPLE_IS_FETCHING
      })
    ).not.toBeNull();
    expect(
      peoples(mockPreviousState, {
        type: peoplesAction.UPDATE_PEOPLE_IS_FETCHING
      })
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_PEOPLE_SUCCEEDED", () => {
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }, { page: 2, list: [{}, {}] }],
      pageCount: 4,
      isFetching: false
    });
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).not.toBeNull();
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_PEOPLE_FAILED", () => {
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 4,
      isFetching: false,
      error: "Error to Fetching Update people"
    });
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).not.toBeNull();
    expect(
      peoples(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toMatchSnapshot();
  });
});
