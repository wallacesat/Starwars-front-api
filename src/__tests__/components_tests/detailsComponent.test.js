import React from "react";
import { shallow } from "enzyme";

import DetailsComponent from "../../components/details/detailsComponent";

const mockData = {
  name: "Gavin George",
  avatar: "http://i.pravatar.cc/40?img=0.10192561403480482",
  model: "suwfena",
  manufacturer: "ca",
  length: 328,
  max_atmosphering_speed: 418,
  passengers: 164,
  cargo_capacity: 3645260,
  consumables: 4,
  vehicle_class: "nopedhus"
};

describe("Testing detailsComponent", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(
      <DetailsComponent data={mockData} resource="vehicles" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });
});
