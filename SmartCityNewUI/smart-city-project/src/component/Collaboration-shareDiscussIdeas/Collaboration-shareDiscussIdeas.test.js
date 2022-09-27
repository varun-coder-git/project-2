import React from "react";
import { shallow } from "enzyme";
import CollaborationShareDiscussIdeas from "./Collaboration-shareDiscussIdeas";

describe("CollaborationShareDiscussIdeas", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationShareDiscussIdeas />);
    expect(wrapper).toMatchSnapshot();
  });
});
