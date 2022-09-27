import React from "react";
import { shallow } from "enzyme";
import CollaborationSDIACardDetails from "./Collaboration-sDI-ACardDetails";

describe("CollaborationSDIACardDetails", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationSDIACardDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
