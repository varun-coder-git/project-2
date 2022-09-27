import React from "react";
import { shallow } from "enzyme";
import VerifyOTP from "./Verify-OTP";

describe("VerifyOTP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<VerifyOTP />);
    expect(wrapper).toMatchSnapshot();
  });
});
