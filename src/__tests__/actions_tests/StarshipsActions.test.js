import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import { starshipsAction } from "../../store/actions/actionsTypes";
import { fetchStarships, updateStarships } from "../../store/actions/starships";
import BASE_URL from "./baseUrl";

const midlewares = [thunk];
const mockStore = configureMockStore(midlewares);

const mockResults = [
  {
    name: "Dale Jackson",
    avatar: "http://i.pravatar.cc/40?img=0.7474128780010723",
    model: "so",
    manufacturer: "vajcez",
    length: 191,
    max_atmosphering_speed: 205,
    passengers: 1473,
    cargo_capacity: 5579622,
    consumables: 1,
    starship_class: "rukvu",
    idItem: 1
  },
  {
    name: "Sylvia Barton",
    avatar: "http://i.pravatar.cc/40?img=0.7575125938238629",
    model: "ejvoj",
    manufacturer: "nubodivas",
    length: 17,
    max_atmosphering_speed: 522,
    passengers: 96,
    cargo_capacity: 2861477,
    consumables: 5,
    starship_class: "lu",
    idItem: 2
  }
];

const mockUpdateResults = [
  {
    name: "Updating Jackson",
    avatar: "http://i.pravatar.cc/40?img=0.7474128780010723",
    model: "so",
    manufacturer: "vajcez",
    length: 191,
    max_atmosphering_speed: 205,
    passengers: 1473,
    cargo_capacity: 5579622,
    consumables: 1,
    starship_class: "rukvu",
    idItem: 1
  },
  {
    name: "Updating Barton",
    avatar: "http://i.pravatar.cc/40?img=0.7575125938238629",
    model: "ejvoj",
    manufacturer: "nubodivas",
    length: 17,
    max_atmosphering_speed: 522,
    passengers: 96,
    cargo_capacity: 2861477,
    consumables: 5,
    starship_class: "lu",
    idItem: 2
  }
];

describe("Testing Starships Action", () => {
  it("Shold create an action to fetching starships data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/starships")
      .reply(200, {
        count: 20,
        results: mockResults
      });

    const expectedAction = [
      { type: starshipsAction.FETCH_STARSHIPS_STARTED },
      {
        type: starshipsAction.FETCH_STARSHIPS_SUCCEEDED,
        starships: {
          page: 1,
          results: mockResults,
          pageCount: 2
        }
      }
    ];

    const store = mockStore({ starships: {} });
    return store.dispatch(fetchStarships()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should return ERROR in fetching starships data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/starships")
      .reply(400, {});

    const expectedAction = [
      { type: starshipsAction.FETCH_STARSHIPS_STARTED },
      {
        type: starshipsAction.FETCH_STARSHIPS_FAILED,
        error: new Error("Request failed with status code 400")
      }
    ];

    const store = mockStore({ starships: {} });
    return store.dispatch(fetchStarships()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should create an action to update starships data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/starships/page=1")
      .reply(200, {
        count: 20,
        results: mockUpdateResults
      });

    const expectedAction = [
      { type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING },
      {
        type: starshipsAction.UPDATE_STARSHIPS_SUCCEEDED,
        starships: {
          page: 1,
          results: mockUpdateResults,
          pageCount: 2
        }
      }
    ];

    const store = mockStore({ starships: {} });
    return store.dispatch(updateStarships(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("Should return ERROR on updating starships data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/starships/page=1")
      .reply(400, {});

    const expectedAction = [
      { type: starshipsAction.UPDATE_STARSHIPS_IS_FETCHING },
      {
        type: starshipsAction.UPDATE_STARSHIPS_FAILED,
        error: new Error("Request failed with status code 400")
      }
    ];

    const store = mockStore({ starships: {} });
    return store.dispatch(updateStarships(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
