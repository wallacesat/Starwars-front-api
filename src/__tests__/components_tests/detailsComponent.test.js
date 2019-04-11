import React from "react";
import { shallow } from "enzyme";

import DetailsComponent from "../../components/details/detailsComponent";

const mockDataVehicles = {
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

const mockDataPeople = {
  name: "Edith Cohen",
  avatar: "http://i.pravatar.cc/40?img=0.3293042978387226",
  height: 237,
  mass: 30,
  hair_color: "cetfeb",
  skin_color: "wupjat",
  eye_color: "sugpuk",
  birth_year: "29BBY",
  gender: "Female"
};

const mockDataPlanets = {
  name: "Evelyn Hammond",
  avatar: "http://i.pravatar.cc/40?img=0.7007931360164223",
  rotation_period: 254,
  orbital_period: 818,
  diameter: 14424,
  climate: "murky",
  gravity: 1.8,
  terrain: "jungles",
  surface_water: 36,
  population: 74070497137
};

const mockDataStarships = {
  name: "Lou Grant",
  avatar: "http://i.pravatar.cc/40?img=0.08821247686377953",
  model: "osozelu",
  manufacturer: "demutu",
  length: 292,
  max_atmosphering_speed: 538,
  passengers: 1278,
  cargo_capacity: 5170939,
  consumables: 5,
  starship_class: "iju"
};

describe("Testing detailsComponent", () => {
  it("Should render correctly when vehicles data", () => {
    const wrapper = shallow(
      <DetailsComponent data={mockDataVehicles} resource="vehicles" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });

  it("Should render correctly when people data", () => {
    const wrapper = shallow(
      <DetailsComponent data={mockDataPeople} resource="peoples" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });

  it("Should render correctly when starships data", () => {
    const wrapper = shallow(
      <DetailsComponent data={mockDataStarships} resource="starships" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });

  it("Should render correctly when planets data", () => {
    const wrapper = shallow(
      <DetailsComponent data={mockDataPlanets} resource="planets" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });
});
