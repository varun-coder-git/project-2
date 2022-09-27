import React from "react";
import { shallow } from "enzyme";
import SosComponent from "./Sos-Component";

describe("SosComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SosComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
