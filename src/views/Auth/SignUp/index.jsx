import React from "react";
import AuthLayout from "../../../layouts/Auth";
import SignUpForm from "../../../components/auth/SignUpForm";

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
