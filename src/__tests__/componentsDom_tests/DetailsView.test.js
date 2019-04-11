import React from "react";
import { shallow } from "enzyme";

import { DetailsView } from "../../views/details/DetailsView";
import { mapStateToProps } from "../../views/details/DetailsView";

const mockMacth = {
  params: {
    object: "planets",
    id: 1
  }
};

const mockLocation = {
  state: [
    {
      idItem: 1,
      avatar: "url/40",
      name: "Test"
    }
  ]
};

describe("Testing DetailsView Dom Component", () => {
  it("Should render self and subcomponents", () => {
    const wrapper = shallow(
      <DetailsView match={mockMacth} location={mockLocation} />
    );

    const propsContainer = wrapper.find("div#container").props();

    expect(propsContainer.style.background).toEqual("#343a40");
    expect(propsContainer.style.position).toEqual("fixed");
    expect(propsContainer.style.width).toEqual("100%");
    expect(propsContainer.style.height).toEqual("100%");
    expect(propsContainer.style.zIndex).toEqual("-10");

    expect(wrapper.find("div#subContainer").hasClass("d-flexflex-column")).toBe(
      true
    );

    expect(wrapper.find("div#head").hasClass("col-12 bg-dark")).toBe(true);

    const resource = "planets";
    expect(
      wrapper
        .find("div#head")
        .children()
        .contains(
          <label className="lead" style={{ color: "white" }}>
            <strong>Details Page: {resource} </strong>
          </label>
        )
    ).toBe(true);

    const propsBody = wrapper.find("div#body").props();
    expect(propsBody.style.height).toEqual(600);
    expect(
      wrapper
        .find("div#body")
        .hasClass("d-flex justify-content-center align-items-stretch")
    ).toBe(true);

    const propsPaperContainer = wrapper.find("div#paperContainer").props();
    expect(propsPaperContainer.style.marginTop).toEqual(10);
    expect(
      wrapper
        .find("div#paperContainer")
        .hasClass(
          "d-flex h-50 flex-column align-items-center justify-content-start"
        )
    ).toBe(true);
    const data = {
      avatar: "url/40",
      name: "Test"
    };
    expect(
      wrapper
        .find("div#paperContainer")
        .children()
        .contains(
          <div>
            <img
              alt=""
              src={data.avatar.replace("/40?", "/160?")}
              className="img-fluid border border-ligth rounded-circle"
            />
          </div>
        )
    ).toBe(true);
    expect(
      wrapper
        .find("div#paperContainer")
        .children()
        .contains(
          <div>
            <label className="display-4">{data.name}</label>
          </div>
        )
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  describe("Testing loader when isFetching data", () => {
    it("Should render correctly loader", () => {
      const wrapper = shallow(
        <DetailsView
          match={{ ...mockMacth, params: { id: 2 } }}
          location={mockLocation}
        />
      );

      const propsLoading = wrapper.find("div#loading").props();
      expect(propsLoading.style.background).toEqual("#343a40");
      expect(propsLoading.style.position).toEqual("fixed");
      expect(propsLoading.style.width).toEqual("100%");
      expect(propsLoading.style.height).toEqual("100%");
      expect(propsLoading.style.zIndex).toEqual("-10");
    });
  });
});
