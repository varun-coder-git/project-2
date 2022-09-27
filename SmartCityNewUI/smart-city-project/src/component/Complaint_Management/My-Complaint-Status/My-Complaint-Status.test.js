import React from "react";
import { shallow } from "enzyme";
import MyComplaintStatus from "./My-Complaint-Status";

describe("MyComplaintStatus", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyComplaintStatus />);
    expect(wrapper).toMatchSnapshot();
  });
});
