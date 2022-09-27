import React from "react";
import { shallow } from "enzyme";
import DashboardIncidentReport from "./Dashboard-IncidentReport";

describe("DashboardIncidentReport", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardIncidentReport />);
    expect(wrapper).toMatchSnapshot();
  });
});
