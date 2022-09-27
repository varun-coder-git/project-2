import React from "react";
import { shallow } from "enzyme";
import ComplaintsDetailsByID from "./Complaints-Details-By-ID";

describe("ComplaintsDetailsByID", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ComplaintsDetailsByID />);
    expect(wrapper).toMatchSnapshot();
  });
});
