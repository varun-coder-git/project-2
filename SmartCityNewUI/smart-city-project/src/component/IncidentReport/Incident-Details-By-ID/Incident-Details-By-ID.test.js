import React from "react";
import { shallow } from "enzyme";
import IncidentDetailsByID from "./Incident-Details-By-ID";

describe("IncidentDetailsByID", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<IncidentDetailsByID />);
    expect(wrapper).toMatchSnapshot();
  });
});
