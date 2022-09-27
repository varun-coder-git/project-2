import React from "react";
import { shallow } from "enzyme";
import LatestTrends from "./LatestTrends";

describe("LatestTrends", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LatestTrends />);
    expect(wrapper).toMatchSnapshot();
  });
});
