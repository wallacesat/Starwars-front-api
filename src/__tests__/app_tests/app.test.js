import React from "react";

import App from "../../App";
import Routes from "../../services/routes";

describe("Testing App component", () => {
  it("Shold render correctly App component with Routes children", () => {
    const { children } = App().props;
    expect(children).toEqual(<Routes />);
    expect(children).not.toBe(null);
    expect(children).toMatchSnapshot();
  });

  it("Shold render correctly App component with initial state", () => {
    const { store } = App().props;
    const expectedState = {
      pagination: { page: 1 },
      peoples: null,
      planets: null,
      starships: null,
      vehicles: null
    };
    expect(store.getState()).toEqual(expectedState);
    expect(store.getState()).not.toBe(null);
    expect(store.getState()).toMatchSnapshot();
  });
});
