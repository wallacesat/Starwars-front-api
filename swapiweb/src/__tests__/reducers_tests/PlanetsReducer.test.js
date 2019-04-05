import planets from "../../store/reducers/planets";
import { planetsAction } from "../../store/actions/actionsTypes";

const mockActionSucceeded = {
  type: planetsAction.FETCH_PLANETS_SUCCEEDED,
  planets: {
    page: 1,
    results: [{}],
    pageCount: 6
  }
};

const mockActionFailed = {
  type: planetsAction.FETCH_PLANETS_FAILED,
  error: "Error to fetching planets"
};

const mockPreviousState = {
  pages: [{ page: 1, list: [{}] }],
  pageCount: 6,
  isFetching: false
};

const mockActionUpdateSucceeded = {
  type: planetsAction.FETCH_PLANETS_SUCCEEDED,
  planets: {
    page: 2,
    results: [{}, {}],
    pageCount: 6
  }
};

const mockActionUpdateFailed = {
  type: planetsAction.UPDATE_PLANETS_FAILED,
  error: "Error to fetching Update planets"
};

describe("Testing Planets Reducer", () => {
  it("Should return initial state = null ", () => {
    expect(planets(undefined, {})).toBeNull();
    expect(planets(undefined, {})).toMatchSnapshot();
  });

  it("Should handle FETCH_PLANETS_STARTED", () => {
    expect(
      planets(null, { type: planetsAction.FETCH_PLANETS_STARTED })
    ).toEqual({
      isFetching: true
    });
    expect(
      planets(null, { type: planetsAction.FETCH_PLANETS_STARTED })
    ).not.toBeNull();
    expect(
      planets(null, { type: planetsAction.FETCH_PLANETS_STARTED })
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_PLANETS_SUCCEEDED", () => {
    expect(planets({ isFetching: true }, mockActionSucceeded)).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 6,
      isFetching: false
    });
    expect(planets({ isFetching: true }, mockActionSucceeded)).not.toBeNull();
    expect(
      planets({ isFetching: true }, mockActionSucceeded)
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_PLANETS_FAILED", () => {
    expect(planets({ isFetching: true }, mockActionFailed)).toEqual({
      error: "Error to fetching planets",
      isFetching: false
    });
    expect(planets({ isFetching: true }, mockActionFailed)).not.toBeNull();
    expect(planets({ isFetching: true }, mockActionFailed)).toMatchSnapshot();
  });

  it("Should handle UPDATE_PLANETS_IS_FETCHING", () => {
    expect(
      planets(mockPreviousState, {
        type: planetsAction.UPDATE_PLANETS_IS_FETCHING
      })
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 6,
      isFetching: true
    });
    expect(
      planets(mockPreviousState, {
        type: planetsAction.UPDATE_PLANETS_IS_FETCHING
      })
    ).not.toBeNull();
    expect(
      planets(mockPreviousState, {
        type: planetsAction.UPDATE_PLANETS_IS_FETCHING
      })
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_PLANETS_SUCCEEDED", () => {
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }, { page: 2, list: [{}, {}] }],
      pageCount: 6,
      isFetching: false
    });
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).not.toBeNull();
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_PLANETS_FAILED", () => {
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 6,
      isFetching: false,
      error: "Error to fetching Update planets"
    });
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).not.toBeNull();
    expect(
      planets(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toMatchSnapshot();
  });
});
