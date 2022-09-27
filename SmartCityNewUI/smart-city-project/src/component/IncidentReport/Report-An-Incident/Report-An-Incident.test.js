import React from "react";
import { shallow } from "enzyme";
import ReportAnIncident from "./Report-An-Incident";

describe("ReportAnIncident", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ReportAnIncident />);
    expect(wrapper).toMatchSnapshot();
  });
});
