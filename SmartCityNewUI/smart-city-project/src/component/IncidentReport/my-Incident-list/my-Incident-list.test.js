import React from "react";
import { shallow } from "enzyme";
import MyIncidentList from "./my-Incident-list";

describe("MyIncidentList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyIncidentList />);
    expect(wrapper).toMatchSnapshot();
  });
});
