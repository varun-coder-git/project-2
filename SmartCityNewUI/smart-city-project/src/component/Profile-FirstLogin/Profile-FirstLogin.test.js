import React from "react";
import { shallow } from "enzyme";
import ProfileFirstLogin from "./Profile-FirstLogin";

describe("ProfileFirstLogin", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileFirstLogin />);
    expect(wrapper).toMatchSnapshot();
  });
});
