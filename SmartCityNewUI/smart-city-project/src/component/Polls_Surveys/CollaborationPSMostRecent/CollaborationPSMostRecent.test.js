import React from "react";
import { shallow } from "enzyme";
import CollaborationPSMostRecent from "./CollaborationPSMostRecent";

describe("CollaborationPSMostRecent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationPSMostRecent />);
    expect(wrapper).toMatchSnapshot();
  });
});
