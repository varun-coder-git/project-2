import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVACardDetails from "./Collaboration-bAV-ACardDetails";

describe("CollaborationBAVACardDetails", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVACardDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
