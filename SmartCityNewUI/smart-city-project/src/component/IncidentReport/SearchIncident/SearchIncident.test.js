import React from "react";
import { shallow } from "enzyme";
import SearchIncident from "./SearchIncident";

describe("SearchIncident", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SearchIncident />);
    expect(wrapper).toMatchSnapshot();
  });
});
