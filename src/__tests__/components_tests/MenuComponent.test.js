import React from "react";
import { shallow } from "enzyme";

import MenuComponent from "../../components/home/MenuComponent";
import people from "../../images/_people.png";

describe("Testing MenuComponent", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(
      <MenuComponent itemName="Peoples" itemImage={people} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeNull();
    expect(wrapper).not.toBeNaN();
  });
});
