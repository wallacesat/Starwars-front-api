import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import { vehiclesAction } from "../../store/actions/actionsTypes";
import { fetchVehicles } from "../../store/actions/vehicles";
import BASE_URL from "./baseUrl";

const midlewares = [thunk];
const mockStore = configureMockStore(midlewares);

const mockResults = [
  {
    name: "Blanche Gilbert",
    avatar: "http://i.pravatar.cc/40?img=0.7765365288473662",
    model: "liaj",
    manufacturer: "demat",
    length: 917,
    max_atmosphering_speed: 532,
    passengers: 1856,
    cargo_capacity: 3015845,
    consumables: 1,
    vehicle_class: "urdo",
    idItem: 1
  },
  {
    name: "Gavin George",
    avatar: "http://i.pravatar.cc/40?img=0.10192561403480482",
    model: "suwfena",
    manufacturer: "ca",
    length: 328,
    max_atmosphering_speed: 418,
    passengers: 164,
    cargo_capacity: 3645260,
    consumables: 4,
    vehicle_class: "nopedhus",
    idItem: 2
  },
  {
    name: "Edward Cruz",
    avatar: "http://i.pravatar.cc/40?img=0.11335424551707507",
    model: "az",
    manufacturer: "zepceb",
    length: 810,
    max_atmosphering_speed: 674,
    passengers: 1728,
    cargo_capacity: 5694589,
    consumables: 4,
    vehicle_class: "lu",
    idItem: 3
  }
];

describe("Testing Vehicles Action", () => {
  it("Shold create an action to fetching vehicles data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/vehicles")
      .reply(200, {
        count: 20,
        results: mockResults
      });

    const expectedAction = [
      { type: vehiclesAction.FETCH_VEHICLES_STARTED },
      {
        type: vehiclesAction.FETCH_VEHICLES_SUCCEEDED,
        vehicles: {
          page: 1,
          results: mockResults,
          pageCount: 2
        }
      }
    ];

    const store = mockStore({ vehicles: {} });
    return store.dispatch(fetchVehicles()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
