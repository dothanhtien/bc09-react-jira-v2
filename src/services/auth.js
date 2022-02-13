import axiosClient from "./axiosClient";
import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  passWord: yup.string().required("Password is required."),
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
