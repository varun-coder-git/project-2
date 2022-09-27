import React from "react";
import { shallow } from "enzyme";
import DefaultMapsLoadComponent from "./DefaultMapsLoadComponent";

describe("DefaultMapsLoadComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DefaultMapsLoadComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
