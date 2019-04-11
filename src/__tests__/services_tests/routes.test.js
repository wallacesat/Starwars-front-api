import React from "react";
import { shallow, mount } from "enzyme";
import { Route, MemoryRouter } from "react-router-dom";

import Routes from "../../services/routes";

import DetailsView from "../../views/details/DetailsView";
import HomeView from "../../views/home/HomeView";
import TablesView from "../../views/itemsTable/TablesView";

let pathMap = {};
describe("Testing Routes Service", () => {
  beforeAll(() => {
    const component = shallow(<Routes />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });

  it("Should render correctly HomeView component to route '/'", () => {
    const component = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(component.find(HomeView)).toHaveLength(1);
    expect(pathMap["/"]).toBe(HomeView);
    expect(pathMap["/"]).toMatchSnapshot();
  });

  it("Should render correctly TablesView component to route '/:object'", () => {
    expect(pathMap["/:object"]).toBe(TablesView);
    expect(pathMap["/:object"]).toMatchSnapshot();
  });

  it("Should render correctly DetailsView component to route '/:object/:id'", () => {
    expect(pathMap["/:object/:id"]).toBe(DetailsView);
    expect(pathMap["/:object/:id"]).toMatchSnapshot();
  });
});
