import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import nock from "nock";

import {
  paginationAction,
  peoplesAction
} from "../../store/actions/actionsTypes";
import { selectPagePagination } from "../../store/actions/pagination";
import { fetchPeople } from "../../store/actions/peoples";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Pagination Action", () => {
  it("Should create an action to change the page showed", () => {
    const page = 3;
    const expectedAction = [
      {
        type: paginationAction.PAGE_SELECTED,
        pagination: { page }
      }
    ];
    const store = mockStore({ pagination: 1 });

    store.dispatch(selectPagePagination(page));
    expect(store.getActions()).toEqual(expectedAction);
    expect(store.getActions()).toMatchSnapshot();
  });
});

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

    nock(
      "https://cors-anywhere.herokuapp.com/https://secure-dusk-28289.herokuapp.com/api"
    )
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
