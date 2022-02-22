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

export const fetchProjectCategories = async (dispatch) => {
  dispatch(createAction(actionType.FETCH_PROJECT_CATEGORIES_REQUEST));
  try {
    const res = await projectService.fetchProjectCategories();

    dispatch(
      createAction(
        actionType.FETCH_PROJECT_CATEGORIES_SUCCESS,
        res.data.content
      )
    );
  } catch (err) {
    console.log(err);
    dispatch(createAction(actionType.FETCH_PROJECT_CATEGORIES_FAILURE));
  }
};

export const createProjectAuthorize = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.CREATE_PROJECT_REQUEST));
    try {
      await projectService.createProjectAuthorize(data);
      dispatch(createAction(actionType.CREATE_PROJECT_SUCCESS));

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(
        createAction(
          actionType.CREATE_PROJECT_FAILURE,
          err.response.data.content
        )
      );
    }
  };
};
