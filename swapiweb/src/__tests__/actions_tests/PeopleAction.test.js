import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import { peoplesAction } from "../../store/actions/actionsTypes";
import { fetchPeople } from "../../store/actions/peoples";
import BASE_URL from "./baseUrl";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResults = [
  {
    name: "Herman Patton",
    avatar: "http://i.pravatar.cc/40?img=0.751236428999503",
    height: 195,
    mass: 36,
    hair_color: "kiovuj",
    skin_color: "zewojf",
    eye_color: "iljolu",
    birth_year: "18BBY",
    gender: "Female",
    idItem: 1
  },
  {
    name: "Justin Davidson",
    avatar: "http://i.pravatar.cc/40?img=0.9587430056915283",
    height: 131,
    mass: 135,
    hair_color: "rivren",
    skin_color: "udjisl",
    eye_color: "idenio",
    birth_year: "28BBY",
    gender: "Male",
    idItem: 2
  }
];

describe("Testing People Action", () => {
  it("Shold create an action to fetching people data", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    nock(BASE_URL)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/people")
      .reply(200, {
        count: 2,
        results: mockResults
      });

    const expectedAction = [
      { type: peoplesAction.FETCH_PEOPLE_STARTED },
      {
        type: peoplesAction.FETCH_PEOPLE_SUCCEEDED,
        people: {
          page: 1,
          results: mockResults,
          pageCount: 1
        }
      }
    ];

    const store = mockStore({ people: {} });
    return store.dispatch(fetchPeople()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
