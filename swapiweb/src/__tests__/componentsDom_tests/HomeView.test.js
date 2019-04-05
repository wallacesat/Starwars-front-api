import React from "react";
import { shallow } from "enzyme";

import HomeView from "../../views/home/HomeView";

import swlogo from "../../images/swlogo.png";
import planet from "../../images/_planet.png";
import starship from "../../images/_starship.png";
import vehicle from "../../images/_vehicle.png";
import people from "../../images/_people.png";

import MenuComponent from "../../components/home/MenuComponent";

const wrapper = shallow(<HomeView />);

describe("Testing HomeView Dom Component", () => {
  it("Sould render self and subcomponents", () => {
    const propsContainer = wrapper.find("div#container").props();
    expect(propsContainer.style.backgroundColor).toEqual("#343a40");
    expect(propsContainer.style.position).toEqual("fixed");
    expect(propsContainer.style.width).toEqual("100%");
    expect(propsContainer.style.height).toEqual("100%");
    expect(propsContainer.style.zIndex).toEqual("-10");
    expect(wrapper.find("#subContainer").hasClass("d-block bg-light")).toBe(
      true
    );

    const propsHead = wrapper.find("div#head").props();
    expect(propsHead.style.backgroundColor).toEqual("#2a2f35");
    expect(wrapper.find("div#head").exists(".h-50")).toBe(true);
    expect(wrapper.find("div#head").exists(".d-flex")).toBe(true);
    expect(
      wrapper
        .find("div#head")
        .children()
        .contains(
          <img src={swlogo} alt="" style={{ height: "auto", width: 300 }} />
        )
    ).toBe(true);

    expect(wrapper.find("div#body").exists(".h-50")).toBe(true);
    expect(wrapper.find("div#body").exists(".flex-row")).toBe(true);
    expect(wrapper.find("div#body").exists(".d-flex")).toBe(true);
    expect(
      wrapper
        .find("div#body")
        .children()
        .contains(
          <div
            id="menu"
            className="d-flex bg-dark w-75 h-100 flex-row align-items-center"
          >
            <MenuComponent itemName="Peoples" itemImage={people} />
            <MenuComponent itemName="Planets" itemImage={planet} />
            <MenuComponent itemName="Starships" itemImage={starship} />
            <MenuComponent itemName="Vehicles" itemImage={vehicle} />
          </div>
        )
    ).toBe(true);

    expect(
      wrapper
        .find("div#menu")
        .hasClass("d-flex bg-dark w-75 h-100 flex-row align-items-center")
    ).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
