import React from "react";
import { shallow } from "enzyme";
import LogAComplaint from "./Log-A-Complaint";

describe("LogAComplaint", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LogAComplaint />);
    expect(wrapper).toMatchSnapshot();
  });
});
