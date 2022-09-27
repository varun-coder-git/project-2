import React from "react";
import { shallow } from "enzyme";
import DashboardNearBy from "./Dashboard-nearBy";

describe("DashboardNearBy", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardNearBy />);
    expect(wrapper).toMatchSnapshot();
  });
});
