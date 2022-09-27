import React from "react";
import { shallow } from "enzyme";
import MyComplaints from "./My-Complaints";

describe("MyComplaints", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyComplaints />);
    expect(wrapper).toMatchSnapshot();
  });
});
