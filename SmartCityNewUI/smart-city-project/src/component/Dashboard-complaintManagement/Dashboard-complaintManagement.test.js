import React from "react";
import { shallow } from "enzyme";
import DashboardComplaintManagement from "./Dashboard-complaintManagement";

describe("DashboardComplaintManagement", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardComplaintManagement />);
    expect(wrapper).toMatchSnapshot();
  });
});
