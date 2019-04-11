import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import configureStore from "redux-mock-store";

import PaginationComponentCon, {
  PaginationComponent
} from "../../components/itemsTable/PaginationComponent";

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

describe("Testing methods selectPage and handlePagination", () => {
  const selectPagePagination = jest.fn();
  const handlePagination = jest.fn();

  it("Sould correctly call methods specifieds when click in first paginator", () => {
    const props = {
      state: { ...state, peoples: { isFetching: true } },
      resource: "peoples",
      selectPagePagination,
      handlePagination
    };

    const wrapper = shallow(<PaginationComponent {...props} />);

    wrapper
      .find("PaginationItem#first")
      .children()
      .props()
      .onClick();

    expect(selectPagePagination.mock.calls.length).toBe(1);
    expect(handlePagination.mock.calls.length).toBe(1);
  });

  it("Sould correctly call methods specifieds when click in last paginator", () => {
    const props = {
      state: { ...state, peoples: { isFetching: true } },
      resource: "peoples",
      selectPagePagination,
      handlePagination
    };

    const wrapper = shallow(<PaginationComponent {...props} />);

    wrapper
      .find("PaginationItem#last")
      .children()
      .props()
      .onClick();

    expect(selectPagePagination.mock.calls.length).toBe(2);
    expect(handlePagination.mock.calls.length).toBe(2);
  });
});

describe("Testing PaginationComponent with state", () => {
  it("Should render correctly with redux state", () => {
    const wrapper = shallow(
      <Router>
        <PaginationComponentCon resource={"peoples"} />
      </Router>,
      {
        context: { store }
      }
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it("Should render correctly without redux state", () => {
    const wrapper = shallow(<PaginationComponentCon />);
    expect(wrapper).toMatchSnapshot();
  });
});
