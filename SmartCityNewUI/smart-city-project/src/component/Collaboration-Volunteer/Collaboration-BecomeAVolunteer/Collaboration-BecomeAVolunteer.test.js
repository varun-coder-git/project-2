import React from "react";
import { shallow } from "enzyme";
import CollaborationBecomeAVolunteer from "./Collaboration-BecomeAVolunteer";

describe("CollaborationBecomeAVolunteer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBecomeAVolunteer />);
    expect(wrapper).toMatchSnapshot();
  });
});
