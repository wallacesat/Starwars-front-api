import store from "../../store";

describe("Testing store redux component", () => {
  it("Should render correctly store with initial state", () => {
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

console.log(store);
