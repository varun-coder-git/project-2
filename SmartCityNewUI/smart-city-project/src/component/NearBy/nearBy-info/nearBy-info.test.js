import React from "react";
import { shallow } from "enzyme";
import NearByInfo from "./nearBy-info";

describe("NearByInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NearByInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
