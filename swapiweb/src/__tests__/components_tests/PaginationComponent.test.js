import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PaginationComponent from "../../components/itemsTable/PaginationComponent";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing PaginationComponent", () => {
  it("Should render correctly without state", () => {
    const wrapper = Enzyme.shallow(<PaginationComponent />);

    expect(wrapper).toMatchSnapshot();
  });
});
