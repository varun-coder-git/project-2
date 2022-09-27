import React from "react";
import { shallow } from "enzyme";
import DashboardHeader from "./Dashboard-header";

describe("DashboardHeader", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
