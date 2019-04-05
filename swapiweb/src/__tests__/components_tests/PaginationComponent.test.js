import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import configureStore from "redux-mock-store";

import PaginationComponent from "../../components/itemsTable/PaginationComponent";

const mockStore = configureStore();

const state = {
  pagination: {
    page: 3
  },
  peoples: {
    isFetching: false,
    pageCount: 6
  }
};

const store = mockStore(state);

describe("Testing PaginationComponent with state", () => {
  it("Should render correctly with redux state", () => {
    const wrapper = shallow(
      <Router>
        <PaginationComponent resource={"peoples"} />
      </Router>,
      {
        context: { store }
      }
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it("Should render correctly without redux state", () => {
    const wrapper = shallow(<PaginationComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
