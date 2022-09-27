import React from "react";
import { shallow } from "enzyme";
import CollaborationSDIStartANewIdea from "./Collaboration-sDI-StartANewIdea";

describe("CollaborationSDIStartANewIdea", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationSDIStartANewIdea />);
    expect(wrapper).toMatchSnapshot();
  });
});
