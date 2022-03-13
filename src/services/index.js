import AuthService from "./auth";
import ProjectService from "./project";
import TaskService from "./task";
import UserService from "./user";

export const authService = new AuthService();
export const projectService = new ProjectService();
export const taskService = new TaskService();
export const userService = new UserService();
