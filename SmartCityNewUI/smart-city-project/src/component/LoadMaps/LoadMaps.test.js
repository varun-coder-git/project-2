import React from "react";
import { shallow } from "enzyme";
import LoadMaps from "./LoadMaps";

describe("LoadMaps", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LoadMaps />);
    expect(wrapper).toMatchSnapshot();
  });
});
