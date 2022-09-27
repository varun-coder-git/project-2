import React from "react";
import { shallow } from "enzyme";
import SearchComplaint from "./Search-Complaint";

describe("SearchComplaint", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SearchComplaint />);
    expect(wrapper).toMatchSnapshot();
  });
});
