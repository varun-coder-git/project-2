import React from "react";
import { shallow } from "enzyme";
import CollaborationPSMostDiscussed from "./CollaborationPSMostDiscussed";

describe("CollaborationPSMostDiscussed", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationPSMostDiscussed />);
    expect(wrapper).toMatchSnapshot();
  });
});
