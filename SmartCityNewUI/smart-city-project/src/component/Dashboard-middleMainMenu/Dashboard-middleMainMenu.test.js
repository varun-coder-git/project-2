import React from "react";
import { shallow } from "enzyme";
import DashboardMiddleMainMenu from "./Dashboard-middleMainMenu";

describe("DashboardMiddleMainMenu", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardMiddleMainMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
