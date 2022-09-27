import React from "react";
import { shallow } from "enzyme";
import DashboardFooter from "./Dashboard-footer";

describe("DashboardFooter", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardFooter />);
    expect(wrapper).toMatchSnapshot();
  });
});
