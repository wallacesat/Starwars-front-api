import { createStore } from "redux";

import rootReducer from "../../store/reducers";

import pagination from "../../store/reducers/pagination";
import peoples from "../../store/reducers/peoples";
import planets from "../../store/reducers/planets";
import starships from "../../store/reducers/starships";
import vehicles from "../../store/reducers/vehicles";

const store = createStore(rootReducer);

describe("Testing combineReducers method in index.js from reducers", () => {
  it("Should render correctly pagination reducer", () => {
    expect(store.getState().pagination).toEqual(pagination({ page: 1 }, {}));
    expect(store.getState().pagination).toMatchSnapshot();
  });

  it("Should render correctly peoples reducer", () => {
    expect(store.getState().peoples).toEqual(peoples(null, {}));
    expect(store.getState().peoples).toMatchSnapshot();
  });

  it("Should render correctly planets reducer", () => {
    expect(store.getState().planets).toEqual(planets(null, {}));
    expect(store.getState().planets).toMatchSnapshot();
  });

  it("Should render correctly starships reducer", () => {
    expect(store.getState().starships).toEqual(starships(null, {}));
    expect(store.getState().starships).toMatchSnapshot();
  });

  it("Should render correctly vehicles reducer", () => {
    expect(store.getState().vehicles).toEqual(vehicles(null, {}));
    expect(store.getState().vehicles).toMatchSnapshot();
  });
});
