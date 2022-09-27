import React from "react";
import { shallow } from "enzyme";
import ProfileChangePassword from "./Profile-changePassword";

describe("ProfileChangePassword", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileChangePassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
