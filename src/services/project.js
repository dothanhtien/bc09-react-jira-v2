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

  fetchProjectDetails(params) {
    return axiosClient.get("/api/Project/getProjectDetail", { params });
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

  // {
  //   "id": 0,
  //   "projectName": "string",
  //   "creator": 0,
  //   "description": "string",
  //   "categoryId": "string"
  // }
  updateProject(data) {
    return axiosClient.put("/api/Project/updateProject", data, {
      params: { projectId: data.id },
    });
  }

  deleteProject(params) {
    return axiosClient.delete("/api/Project/deleteProject", { params });
  }
}

export default ProjectService;
