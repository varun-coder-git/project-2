import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVMostTrending from "./Collaboration-bAV-MostTrending";

describe("CollaborationBAVMostTrending", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVMostTrending />);
    expect(wrapper).toMatchSnapshot();
  });
});
