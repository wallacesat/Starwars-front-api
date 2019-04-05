import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import { planetsAction } from "../../store/actions/actionsTypes";
import { fetchPlanets } from "../../store/actions/planets";
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
});
