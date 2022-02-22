import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  categoryId: yup
    .number()
    .required("Project category is required")
    .min(1, "Project category is required")
    .max(3, "Project category is required"),
});

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("/api/Project/getAllProject", { params });
  }

  fetchProjectCategories() {
    return axiosClient.get("/api/ProjectCategory");
  }

  // {
  //   "projectName": "string",
  //   "description": "string",
  //   "categoryId": 0,
  //   "alias": "string"
  // }
  createProjectAuthorize(data) {
    return axiosClient.post("/api/Project/createProjectAuthorize", data);
  }
}

export default ProjectService;