import React from "react";
import { shallow } from "enzyme";

import TableComponent from "../../components/itemsTable/TableComponent";

const mockItems = [
  {
    name: "Herman Patton",
    avatar: "http://i.pravatar.cc/40?img=0.751236428999503",
    height: 195,
    mass: 36,
    hair_color: "kiovuj",
    skin_color: "zewojf",
    eye_color: "iljolu",
    birth_year: "18BBY",
    gender: "Female",
    idItem: 1
  },
  {
    name: "Justin Davidson",
    avatar: "http://i.pravatar.cc/40?img=0.9587430056915283",
    height: 131,
    mass: 135,
    hair_color: "rivren",
    skin_color: "udjisl",
    eye_color: "idenio",
    birth_year: "28BBY",
    gender: "Male",
    idItem: 2
  }
];

const mockColumns = ["Name", "Gender", "Eyes Color"];

describe("Testing TableComponent", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(
      <TableComponent
        columns={mockColumns}
        items={mockItems}
        resource="peoples"
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toBeUndefined();
    expect(wrapper).not.toBeNull();
  });
});
