import React from "react";
import { shallow } from "enzyme";
import DashboardCitizenServices from "./Dashboard-citizenServices";

describe("DashboardCitizenServices", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardCitizenServices />);
    expect(wrapper).toMatchSnapshot();
  });
});
