import { createAction } from ".";
import { actionType } from "./type";
import { projectService } from "../../services";

export const fetchAllProjects = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_ALL_PROJECTS_REQUEST));
    try {
      const res = await projectService.fetchAllProjects(params);

      dispatch(
        createAction(actionType.FETCH_ALL_PROJECTS_SUCCESS, res.data.content)
      );
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionType.FETCH_ALL_PROJECTS_FAILURE));
    }
  };
};
