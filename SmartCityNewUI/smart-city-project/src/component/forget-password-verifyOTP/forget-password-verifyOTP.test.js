import React from "react";
import { shallow } from "enzyme";
import ForgetPasswordVerifyOTP from "./forget-password-verifyOTP";

describe("ForgetPasswordVerifyOTP", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ForgetPasswordVerifyOTP />);
    expect(wrapper).toMatchSnapshot();
  });
});
