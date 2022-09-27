import React from "react";
import { shallow } from "enzyme";
import IncidentStatus from "./IncidentStatus";

describe("IncidentStatus", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<IncidentStatus />);
    expect(wrapper).toMatchSnapshot();
  });
});
