import vehicles from "../../store/reducers/vehicles";
import { vehiclesAction } from "../../store/actions/actionsTypes";

const mockActionSucceeded = {
  type: vehiclesAction.FETCH_VEHICLES_SUCCEEDED,
  vehicles: {
    page: 1,
    results: [{}],
    pageCount: 5
  }
};

const mockActionFailed = {
  type: vehiclesAction.FETCH_VEHICLES_FAILED,
  error: "Error to fetching vehicles"
};

const mockPreviousState = {
  pages: [{ page: 1, list: [{}] }],
  pageCount: 5,
  isFetching: false
};

const mockActionUpdateSucceeded = {
  type: vehiclesAction.UPDATE_VEHICLES_SUCCEEDED,
  vehicles: {
    page: 2,
    results: [{}, {}],
    pageCount: 5
  }
};

const mockActionUpdateFailed = {
  type: vehiclesAction.UPDATE_VEHICLES_FAILED,
  error: "Error to fetching Update vehicles"
};

describe("Testing vehicles Reducer", () => {
  it("Should return initial state = null", () => {
    expect(vehicles(undefined, {})).toBeNull();
    expect(vehicles(undefined, {})).toMatchSnapshot();
  });

  it("Should handle FETCH_VEHICLES_STARTED", () => {
    expect(
      vehicles(null, { type: vehiclesAction.FETCH_VEHICLES_STARTED })
    ).toEqual({
      isFetching: true
    });
    expect(
      vehicles(null, { type: vehiclesAction.FETCH_VEHICLES_STARTED })
    ).not.toBeNull();
    expect(
      vehicles(null, { type: vehiclesAction.FETCH_VEHICLES_STARTED })
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_VEHICLES_SUCCEEDED", () => {
    expect(vehicles({ isFetching: true }, mockActionSucceeded)).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: false
    });
    expect(vehicles({ isFetching: true }, mockActionSucceeded)).not.toBeNull();
    expect(
      vehicles({ isFetching: true }, mockActionSucceeded)
    ).toMatchSnapshot();
  });

  it("Should handle FETCH_VEHICLES_FAILED", () => {
    expect(vehicles({ isFetching: true }, mockActionFailed)).toEqual({
      error: "Error to fetching vehicles",
      isFetching: false
    });
    expect(vehicles({ isFetching: true }, mockActionFailed)).not.toBeNull();
    expect(vehicles({ isFetching: true }, mockActionFailed)).toMatchSnapshot();
  });

  it("Should handle UPDATE_VEHICLES_IS_FETCHING", () => {
    expect(
      vehicles(mockPreviousState, {
        type: vehiclesAction.UPDATE_VEHICLES_IS_FETCHING
      })
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: true
    });
    expect(
      vehicles(mockPreviousState, {
        type: vehiclesAction.UPDATE_VEHICLES_IS_FETCHING
      })
    ).not.toBeNull();
    expect(
      vehicles(mockPreviousState, {
        type: vehiclesAction.UPDATE_VEHICLES_IS_FETCHING
      })
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_VEHICLES_SUCCEEDED", () => {
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }, { page: 2, list: [{}, {}] }],
      pageCount: 5,
      isFetching: false
    });
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).not.toBeNull();
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateSucceeded
      )
    ).toMatchSnapshot();
  });

  it("Should handle UPDATE_VEHICLES_FAILED", () => {
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toEqual({
      pages: [{ page: 1, list: [{}] }],
      pageCount: 5,
      isFetching: false,
      error: "Error to fetching Update vehicles"
    });
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).not.toBeNull();
    expect(
      vehicles(
        { ...mockPreviousState, isFetching: true },
        mockActionUpdateFailed
      )
    ).toMatchSnapshot();
  });
});
