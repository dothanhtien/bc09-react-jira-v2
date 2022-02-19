import axiosClient from "./axiosClient";
import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  passWord: yup.string().required("Password is required."),
});

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .max(255, "Email cannot be more than 255 characters"),
  name: yup.string().max(255, "Name cannot be more than 255 characters"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]*$/, "Phone number must contain numbers only")
    .max(30, "Phone number cannot be more than 30 digits"),
  passWord: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot be more than 100 characters"),
  passWordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("passWord")], "Password does not match")
    .max(100, "Password cannot be more than 100 characters"),
});

class AuthService {
  // {
  //   "email": "string",
  //   "passWord": "string"
  // }
  signIn(data) {
    return axiosClient.post("/api/Users/signin", data);
  }

  // {
  //   "email": "string",
  //   "passWord": "string",
  //   "name": "string",
  //   "phoneNumber": "string"
  // }
  signUp(data) {
    return axiosClient.post("/api/Users/signup", data);
  }
}

export default AuthService;
