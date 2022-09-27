import React from "react";
import { shallow } from "enzyme";
import DefaultMapNearby from "./defaultMapNearby";

describe("DefaultMapNearby", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DefaultMapNearby />);
    expect(wrapper).toMatchSnapshot();
  });
});
