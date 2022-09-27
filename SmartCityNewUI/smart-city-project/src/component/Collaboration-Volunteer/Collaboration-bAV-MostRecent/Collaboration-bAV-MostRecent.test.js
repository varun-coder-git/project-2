import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVMostRecent from "./Collaboration-bAV-MostRecent";

describe("CollaborationBAVMostRecent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVMostRecent />);
    expect(wrapper).toMatchSnapshot();
  });
});
