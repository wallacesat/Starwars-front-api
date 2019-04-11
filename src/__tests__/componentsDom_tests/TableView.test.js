import React from "react";
import { shallow } from "enzyme";

import { TablesView } from "../../views/itemsTable/TablesView";

import { mapStateToProps } from "../../views/itemsTable/TablesView";

const mockMatch = param => ({
  params: {
    object: param
  }
});

const mockState = param => ({
  pagination: {
    page: 3
  },
  [param]: {
    isFetching: false,
    pageCount: 6,
    pages: [
      { page: 1, list: [{ page1: "1" }] },
      { page: 2, list: [{ page2: "2" }] },
      { page: 3, list: [{ page3: "3" }] }
    ]
  }
});

describe("Testing back page Button", () => {
  it("Should call correctly the selectPagePagination action", () => {
    const selectPagePagination = jest.fn();

    const props = {
      match: mockMatch("planets"),
      state: { ...mockState("planets") },
      currentPage: () => 0,
      selectPagePagination
    };

    const wrapper = shallow(<TablesView {...props} />);

    wrapper
      .find("div#footerContainer")
      .children()
      .props()
      .onClick();

    expect(selectPagePagination.mock.calls.length).toBe(1);
  });
});

describe("Testing call of function handlePaginate", () => {
  it("Should call the function updatePlanets correctly when findInState return false", () => {
    const updatePlanets = jest.fn();
    const findInState = jest.fn().mockReturnValue(false);

    function setup() {
      const props = {
        match: mockMatch("planets"),
        state: { ...mockState("planets"), pagination: { page: 4 } },
        currentPage: () => 0,
        updatePlanets,
        findInState
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    const { wrapper } = setup();
    wrapper
      .find("div#paginator")
      .children()
      .props()
      .handlePagination(4);

    expect(findInState.mock.results[0].value).toBe(false);
    expect(findInState.mock.calls.length).toBe(1);
    expect(updatePlanets.mock.calls.length).toBe(1);
  });

  it("Not should call the function updatePlanets when findInState return true", () => {
    const updatePlanets = jest.fn();
    const findInState = jest.fn().mockReturnValue(true);

    function setup() {
      const props = {
        match: mockMatch("planets"),
        state: { ...mockState("planets"), pagination: { page: 3 } },
        currentPage: () => 0,
        updatePlanets,
        findInState
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    const { wrapper } = setup();
    wrapper
      .find("div#paginator")
      .children()
      .props()
      .handlePagination(4);

    expect(findInState.mock.results[0].value).toBe(true);
    expect(findInState.mock.calls.length).toBe(1);
    expect(updatePlanets.mock.calls.length).toBe(0);
  });
});

describe("Testing map to Props functions", () => {
  const state = mockState("planets");

  const ownProps = {
    match: mockMatch("planets")
  };

  it("Should return 2 in function currentPage from mapStateToProps", () => {
    expect(mapStateToProps(state, ownProps).currentPage()).toEqual(2);
  });

  it("Should return 0 in function currentPage from mapStateToProps when findIndex retur < 0", () => {
    expect(
      mapStateToProps(
        { ...state, planets: { pages: [{ page: 1 }] } },
        ownProps
      ).currentPage()
    ).toEqual(0);
  });

  it("should correctly return the item referring to the specified page", () => {
    expect(mapStateToProps(state, ownProps).findInState(2)).toEqual({
      page: 2,
      list: [{ page2: "2" }]
    });
  });
});

describe("Testing functions calls in case of state null", () => {
  it("Should call fetchPlanets for state planets null", () => {
    const fetchPlanets = jest.fn();

    function setup() {
      const props = {
        match: mockMatch("planets"),
        state: { ...mockState("planets"), planets: null },
        currentPage: () => 0,
        fetchPlanets
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    setup();
    expect(fetchPlanets.mock.calls.length).toBe(1);
  });

  it("Should call fetchPeople for state peoples null", () => {
    const fetchPeople = jest.fn();

    function setup() {
      const props = {
        match: mockMatch("peoples"),
        state: { ...mockState("peoples"), peoples: null },
        currentPage: () => 0,
        fetchPeople
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    setup();
    expect(fetchPeople.mock.calls.length).toBe(1);
  });

  it("Should call fetchStarships for state starships null", () => {
    const fetchStarships = jest.fn();

    function setup() {
      const props = {
        match: mockMatch("starships"),
        state: { ...mockState("starships"), starships: null },
        currentPage: () => 0,
        fetchStarships
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    setup();
    expect(fetchStarships.mock.calls.length).toBe(1);
  });

  it("Should call fetchVehicles for state vehicles null", () => {
    const fetchVehicles = jest.fn();

    function setup() {
      const props = {
        match: mockMatch("vehicles"),
        state: { ...mockState("vehicles"), vehicles: null },
        currentPage: () => 0,
        fetchVehicles
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }

    setup();
    expect(fetchVehicles.mock.calls.length).toBe(1);
  });
});

describe("Testing TablesView Dom Component", () => {
  it("Should render self and subcomponents with object params 'planets' ", () => {
    function setup() {
      const props = {
        match: mockMatch("planets"),
        state: mockState("planets"),
        currentPage: () => 0
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }
    const { wrapper } = setup();

    const propsContainer = wrapper.find("div#container").props();
    expect(propsContainer.style.backgroundColor).toEqual("#343a40");
    expect(propsContainer.style.position).toEqual("fixed");
    expect(propsContainer.style.width).toEqual("100%");
    expect(propsContainer.style.height).toEqual("100%");
    expect(propsContainer.style.zIndex).toEqual("-10");

    expect(wrapper.find("div#head").exists(".d-flex")).toBe(true);
    expect(wrapper.find("div#head").exists(".m-1")).toBe(true);
    expect(wrapper.find("div#head").exists(".p-1")).toBe(true);

    expect(wrapper.find("div#body").exists(".d-block")).toBe(true);
    expect(wrapper.find("div#body").exists(".bg-light")).toBe(true);
    expect(wrapper.find("div#body").exists(".h-75")).toBe(true);

    const propsTable = wrapper.find("div#table").props();
    expect(propsTable.style.borderRadius).toEqual(8);
    expect(wrapper.find("div#table").hasClass("d-flex bg-light h-100")).toBe(
      true
    );

    expect(wrapper.find("div#paginator").hasClass("h-25 w-50 pt-3 pl-3")).toBe(
      true
    );

    expect(wrapper.find("div#footer").hasClass("d-block")).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render self and subcomponents with object params 'peoples' ", () => {
    function setup() {
      const props = {
        match: mockMatch("peoples"),
        state: mockState("peoples"),
        currentPage: () => 0
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }
    const { wrapper } = setup();
    expect(wrapper).toHaveLength(1);
  });

  it("Should render self and subcomponents with object params 'starships' ", () => {
    function setup() {
      const props = {
        match: mockMatch("starships"),
        state: mockState("starships"),
        currentPage: () => 0
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }
    const { wrapper } = setup();
    expect(wrapper).toHaveLength(1);
  });

  it("Should render self and subcomponents with object params 'vehicles' ", () => {
    function setup() {
      const props = {
        match: mockMatch("vehicles"),
        state: mockState("vehicles"),
        currentPage: () => 0
      };
      const wrapper = shallow(<TablesView {...props} />);
      return {
        props,
        wrapper
      };
    }
    const { wrapper } = setup();
    expect(wrapper).toHaveLength(1);
  });
});
