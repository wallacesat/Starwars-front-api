import React from "react";
import { shallow } from "enzyme";

import { TablesView } from "../../views/itemsTable/TablesView";

const mockMatch = {
  params: {
    object: "planets"
  }
};

const mockState = {
  pagination: {
    page: 3
  },
  planets: {
    isFetching: false,
    pageCount: 6,
    pages: [{ page: 1, list: [{}] }]
  }
};

describe("Testing TablesView Dom Component", () => {
  it("Should render self and subcomponents", () => {
    const wrapper = shallow(
      <TablesView match={mockMatch} state={mockState} currentPage={() => 0} />
    );

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
});
