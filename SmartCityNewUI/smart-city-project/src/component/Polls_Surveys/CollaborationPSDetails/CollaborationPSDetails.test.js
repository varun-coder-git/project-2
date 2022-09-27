import React from "react";
import { shallow } from "enzyme";
import CollaborationPSDetails from "./CollaborationPSDetails";

describe("CollaborationPSDetails", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationPSDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
