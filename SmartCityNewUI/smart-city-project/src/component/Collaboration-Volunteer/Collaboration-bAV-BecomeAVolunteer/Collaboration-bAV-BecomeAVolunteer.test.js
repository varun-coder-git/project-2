import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVBecomeAVolunteer from "./Collaboration-bAV-BecomeAVolunteer";

describe("CollaborationBAVBecomeAVolunteer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVBecomeAVolunteer />);
    expect(wrapper).toMatchSnapshot();
  });
});
