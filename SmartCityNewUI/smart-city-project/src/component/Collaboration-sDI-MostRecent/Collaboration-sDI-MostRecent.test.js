import React from "react";
import { shallow } from "enzyme";
import CollaborationSDIMostRecent from "./Collaboration-sDI-MostRecent";

describe("CollaborationSDIMostRecent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationSDIMostRecent />);
    expect(wrapper).toMatchSnapshot();
  });
});
