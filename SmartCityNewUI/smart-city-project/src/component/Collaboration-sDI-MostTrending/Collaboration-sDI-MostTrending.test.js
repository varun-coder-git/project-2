import React from "react";
import { shallow } from "enzyme";
import CollaborationSDIMostTrending from "./Collaboration-sDI-MostTrending";

describe("CollaborationSDIMostTrending", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationSDIMostTrending />);
    expect(wrapper).toMatchSnapshot();
  });
});
