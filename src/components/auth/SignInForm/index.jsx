import React from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from "../../../store/selector";
import { signIn } from "../../../store/actions/auth";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signingInSelector = createLoadingSelector(["SIGN_IN"]);
  const isSigningIn = useSelector((state) => signingInSelector(state));
  const signInErrorMessageSelector = createErrorMessageSelector(["SIGN_IN"]);
  const signInErrorMessage = useSelector((state) =>
    signInErrorMessageSelector(state)
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      passWord: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      signIn(data, () => {
        console.log("Test");
        navigate("/projects");
      })
    );
  };

  return (
    <Card className="shadow-xl">
      <Form
        name="sign-in-form"
        style={{ width: "300px" }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Typography.Title className="text-center">Cyber Bug</Typography.Title>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item name="email">
              <Input
                prefix={<UserOutlined />}
                placeholder="Email address"
                {...field}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="passWord"
          control={control}
          render={({ field }) => (
            <Form.Item name="password">
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                {...field}
              />
            </Form.Item>
          )}
        />

        {(!!Object.keys(errors).length || signInErrorMessage) && (
          <Typography.Text type="danger" className="block mb-6">
            Invalid email address or password.
          </Typography.Text>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mb-6"
            loading={isSigningIn}
          >
            Sign in
          </Button>

          <Typography>
            Don't have an account <Link to="/sign-up">Register now!</Link>
          </Typography>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignInForm;
