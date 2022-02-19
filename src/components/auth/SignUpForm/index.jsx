import React, { useEffect } from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import MandatoryLabel from "../../ui/Label/Mandatory";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from "../../../store/selector";
import { signUp } from "../../../store/actions/auth";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const signingUpSelector = createLoadingSelector(["SIGN_UP"]);
  const isSigningUp = useSelector((state) => signingUpSelector(state));
  const signUpErrorMessageSelector = createErrorMessageSelector(["SIGN_UP"]);
  const signUpErrorMessage = useSelector((state) =>
    signUpErrorMessageSelector(state)
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      passWord: "",
      passWordConfirmation: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (signUpErrorMessage === "Email đã được sử dụng!") {
      setError("email", {
        type: "shouldUnregister",
        message: "Email already exists",
      });
    }
  }, [signUpErrorMessage, setError]);

  const onSubmit = (data) => {
    dispatch(
      signUp(data, () => {
        Swal.fire({
          icon: "success",
          title: "Signed up successfully",
          showConfirmButton: false,
        });
        reset();
      })
    );
  };

  return (
    <Card className="shadow-xl">
      <Form
        name="sign-in-form"
        style={{ width: "300px" }}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Typography.Title className="text-center">Cyber Bug</Typography.Title>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={<MandatoryLabel text="Email address" />}
              validateStatus={errors.email && "error"}
              help={errors.email?.message}
            >
              <Input {...field} placeholder="Email address" />
            </Form.Item>
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Name"
              validateStatus={errors.name && "error"}
              help={errors.name?.message}
            >
              <Input {...field} placeholder="Name" />
            </Form.Item>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Phone number"
              validateStatus={errors.phoneNumber && "error"}
              help={errors.phoneNumber?.message}
            >
              <Input {...field} placeholder="Phone number" />
            </Form.Item>
          )}
        />

        <Controller
          name="passWord"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={<MandatoryLabel text="Password" />}
              validateStatus={errors.passWord && "error"}
              help={errors.passWord?.message}
            >
              <Input {...field} type="password" placeholder="Password" />
            </Form.Item>
          )}
        />

        <Controller
          name="passWordConfirmation"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={<MandatoryLabel text="Password confirmation" />}
              validateStatus={errors.passWordConfirmation && "error"}
              help={errors.passWordConfirmation?.message}
            >
              <Input
                {...field}
                type="password"
                placeholder="Password confirmation"
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mb-6"
            loading={isSigningUp}
          >
            Sign up
          </Button>

          <Typography>
            Already have an account <Link to="/sign-in">Sign in now!</Link>
          </Typography>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpForm;
