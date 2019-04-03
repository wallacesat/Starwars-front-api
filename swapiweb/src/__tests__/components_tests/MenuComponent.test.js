import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MenuComponent from "../../components/home/MenuComponent";
import people from "../../images/_people.png";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing MenuComponent", () => {
  it("Should render correctly", () => {
    const wrapper = Enzyme.shallow(
      <MenuComponent itemName="Peoples" itemImage={people} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
