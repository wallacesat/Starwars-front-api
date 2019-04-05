import starships from "../../store/reducers/starships";
import { starshipsAction } from "../../store/actions/actionsTypes";

const mockActionSucceeded = {
  type: starshipsAction.FETCH_STARSHIPS_SUCCEEDED,
  starships: {
    page: 1,
    results: [{}],
    pageCount: 5
  }
};

const mockActionFailed = {
  type: starshipsAction.FETCH_STARSHIPS_FAILED,
  error: "Error to fetching starships"
};

const mockPreviousState = {
  pages: [{ page: 1, list: [{}] }],
  pageCount: 5,
  isFetching: false
};

const mockActionUpdateSucceeded = {
  type: starshipsAction.UPDATE_STARSHIPS_SUCCEEDED,
  starships: {
    page: 2,
    results: [{}, {}],
    pageCount: 5
  }
};

const mockActionUpdateFailed = {
  type: starshipsAction.UPDATE_STARSHIPS_FAILED,
  error: "Error to fetching Update starships"
};

describe("Testing Starships Reducer", () => {
  it("Should return initial state = null", () => {
    expect(starships(undefined, {})).toBeNull();
    expect(starships(undefined, {})).toMatchSnapshot();
  });

  it("Should handle FETCH_STARSHIPS_STARTED", () => {
    expect(
      starships(null, { type: starshipsAction.FETCH_STARSHIPS_STARTED })
    ).toEqual({
      isFetching: true
    });
    expect(
      starships(null, { type: starshipsAction.FETCH_STARSHIPS_STARTED })
    ).not.toBeNull();
    expect(
      starships(null, { type: starshipsAction.FETCH_STARSHIPS_STARTED })
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_STARSHIPS_SUCCEEDED", () => {
    expect(starships({ isFetching: true }, mockActionSucceeded)).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: false
    });
    expect(starships({ isFetching: true }, mockActionSucceeded)).not.toBeNull();
    expect(
      starships({ isFetching: true }, mockActionSucceeded)
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_STARSHIPS_FAILED", () => {
    expect(starships({ isFetching: true }, mockActionFailed)).toEqual({
      error: "Error to fetching starships",
      isFetching: false
    });
    expect(starships({ isFetching: true }, mockActionFailed)).not.toBeNull();
    expect(starships({ isFetching: true }, mockActionFailed)).toMatchSnapshot();
  });

  it("Should handle UPDATE_STARSHIPS_IS_FETCHING", () => {
    expect(
      starships(mockPreviousState, {
        type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING
      })
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: true
    });
    expect(
      starships(mockPreviousState, {
        type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING
      })
    ).not.toBeNull();
    expect(
      starships(mockPreviousState, {
        type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING
      })
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_STARSHIPS_SUCCEEDED", () => {
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }, { page: 2, list: [{}, {}] }],
      pageCount: 5,
      isFetching: false
    });
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).not.toBeNull();
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_STARSHIPS_FAILED", () => {
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: false,
      error: "Error to fetching Update starships"
    });
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).not.toBeNull();
    expect(
      starships(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toMatchSnapshot();
  });
});
