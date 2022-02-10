import axiosClient from "./axiosClient";

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
