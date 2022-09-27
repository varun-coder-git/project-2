import React from "react";
import { shallow } from "enzyme";
import CollaborationPollsSurveys from "./Collaboration-pollsSurveys";

describe("CollaborationPollsSurveys", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CollaborationPollsSurveys />);
    expect(wrapper).toMatchSnapshot();
  });
});
