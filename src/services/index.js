import AuthService from "./auth";
import ProjectService from "./project";
import TaskService from "./task";
import CommentService from "./comment";
import UserService from "./user";

export const authService = new AuthService();
export const projectService = new ProjectService();
export const taskService = new TaskService();
export const commentService = new CommentService();
export const userService = new UserService();
