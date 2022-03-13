import axiosClient from "./axiosClient";

class UserService {
  fetchUsers(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }

  fetchUsersByProject(idProject) {
    return axiosClient.get("/api/Users/getUserByProjectId", {
      params: { idProject },
    });
  }
}

export default UserService;
