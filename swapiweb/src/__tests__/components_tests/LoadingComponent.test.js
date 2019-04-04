import React from "react";
import { shallow } from "enzyme";

import LoadingComponent from "../../components/details/LoadingComponent";

describe("Testing LoadingComponent", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(<LoadingComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
