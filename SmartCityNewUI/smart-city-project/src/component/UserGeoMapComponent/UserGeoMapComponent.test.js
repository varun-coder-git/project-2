import React from "react";
import { shallow } from "enzyme";
import UserGeoMapComponent from "./UserGeoMapComponent";

describe("UserGeoMapComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserGeoMapComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
