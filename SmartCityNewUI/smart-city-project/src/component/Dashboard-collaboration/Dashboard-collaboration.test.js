import React from "react";
import { shallow } from "enzyme";
import DashboardCollaboration from "./Dashboard-collaboration";

describe("DashboardCollaboration", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardCollaboration />);
    expect(wrapper).toMatchSnapshot();
  });
});
