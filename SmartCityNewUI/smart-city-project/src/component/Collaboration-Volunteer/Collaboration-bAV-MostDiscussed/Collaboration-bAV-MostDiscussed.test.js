import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVMostDiscussed from "./Collaboration-bAV-MostDiscussed";

describe("CollaborationBAVMostDiscussed", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVMostDiscussed />);
    expect(wrapper).toMatchSnapshot();
  });
});
