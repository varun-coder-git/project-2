import React from "react";
import { shallow } from "enzyme";
import ProfileMyProfile from "./Profile-myProfile";

describe("ProfileMyProfile", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileMyProfile />);
    expect(wrapper).toMatchSnapshot();
  });
});
