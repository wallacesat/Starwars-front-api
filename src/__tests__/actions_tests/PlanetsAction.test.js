import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import { planetsAction } from "../../store/actions/actionsTypes";
import { fetchPlanets, updatePlanets } from "../../store/actions/planets";
import BASE_URL from "./baseUrl";

const midlewares = [thunk];
const mockStore = configureMockStore(midlewares);

const mockResults = [
  {
    name: "Alma Hopkins",
    avatar: "http://i.pravatar.cc/40?img=0.28152803167206786",
    rotation_period: 128,
    orbital_period: 459,
    diameter: 7065,
    climate: "murky",
    gravity: 2.5,
    terrain: "swamp",
    surface_water: 37,
    population: 38727741060,
    idItem: 1
  }
];

const mockUpdateResults = [
  {
    name: "Person Updating",
    avatar: "http://i.pravatar.cc/40?img=0.28152803167206786",
    rotation_period: 128,
    orbital_period: 459,
    diameter: 7065,
    climate: "murky",
    gravity: 2.5,
    terrain: "swamp",
    surface_water: 37,
    population: 38727741060,
    idItem: 1
  }
];

describe("Testing Planets Action", () => {
  it("Shold create an action to fetching planets data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/planets")
      .reply(200, {
        count: 20,
        results: mockResults
      });

    const expectedAction = [
      { type: planetsAction.FETCH_PLANETS_STARTED },
      {
        type: planetsAction.FETCH_PLANETS_SUCCEEDED,
        planets: {
          page: 1,
          results: mockResults,
          pageCount: 2
        }
      }
    ];

    const store = mockStore({ planets: {} });
    return store.dispatch(fetchPlanets()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should return ERROR in fetching planets data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/planets")
      .reply(400, {});

    const expectedAction = [
      { type: planetsAction.FETCH_PLANETS_STARTED },
      {
        type: planetsAction.FETCH_PLANETS_FAILED,
        error: new Error("Request failed with status code 400")
      }
    ];

    const store = mockStore({ planets: {} });
    return store.dispatch(fetchPlanets()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should create an action to update planets data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/planets/page=1")
      .reply(200, {
        count: 20,
        results: mockUpdateResults
      });

    const expectedAction = [
      { type: planetsAction.UPDATE_PLANETS_IS_FETCHING },
      {
        type: planetsAction.UPDATE_PLANETS_SUCCEEDED,
        planets: {
          page: 1,
          results: mockUpdateResults,
          pageCount: 2
        }
      }
    ];

    const store = mockStore({ planets: {} });
    return store.dispatch(updatePlanets(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should return ERROR on updating planets data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/planets/page=1")
      .reply(400, {});

    const expectedAction = [
      { type: planetsAction.UPDATE_PLANETS_IS_FETCHING },
      {
        type: planetsAction.UPDATE_PLANETS_FAILED,
        error: new Error("Request failed with status code 400")
      }
    ];

    const store = mockStore({ planets: {} });
    return store.dispatch(updatePlanets(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
