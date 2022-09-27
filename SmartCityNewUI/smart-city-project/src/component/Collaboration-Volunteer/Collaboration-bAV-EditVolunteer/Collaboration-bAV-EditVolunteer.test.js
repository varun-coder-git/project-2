import React from "react";
import { shallow } from "enzyme";
import CollaborationBAVEditVolunteer from "./Collaboration-bAV-EditVolunteer";

describe("CollaborationBAVEditVolunteer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationBAVEditVolunteer />);
    expect(wrapper).toMatchSnapshot();
  });
});
