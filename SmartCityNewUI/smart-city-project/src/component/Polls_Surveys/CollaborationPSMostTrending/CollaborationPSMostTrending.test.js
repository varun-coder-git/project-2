import React from "react";
import { shallow } from "enzyme";
import CollaborationPSMostTrending from "./CollaborationPSMostTrending";

describe("CollaborationPSMostTrending", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationPSMostTrending />);
    expect(wrapper).toMatchSnapshot();
  });
});
