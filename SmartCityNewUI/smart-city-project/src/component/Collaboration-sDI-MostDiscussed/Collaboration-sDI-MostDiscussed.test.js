import React from "react";
import { shallow } from "enzyme";
import CollaborationSDIMostDiscussed from "./Collaboration-sDI-MostDiscussed";

describe("CollaborationSDIMostDiscussed", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationSDIMostDiscussed />);
    expect(wrapper).toMatchSnapshot();
  });
});
