import { createAction } from ".";
import { actionType } from "./type";
import { projectService, userService } from "../../services";

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

export const fetchProjectMembers = (projectId) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_PROJECT_MEMBERS_REQUEST));
    try {
      const res = await userService.fetchUsersByProject(projectId);

      dispatch(
        createAction(actionType.FETCH_PROJECT_MEMBERS_SUCCESS, res.data.content)
      );
    } catch (err) {
      if (err.response.data.statusCode === 404) {
        dispatch(createAction(actionType.FETCH_PROJECT_MEMBERS_SUCCESS, []));
      }

      dispatch(createAction(actionType.FETCH_PROJECT_MEMBERS_FAILURE));
    }
  };
};

export const fetchProjectDetails = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_PROJECT_DETAILS_REQUEST));
    try {
      const res = await projectService.fetchProjectDetails(params);

      dispatch(
        createAction(actionType.FETCH_PROJECT_DETAILS_SUCCESS, res.data.content)
      );
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionType.FETCH_PROJECT_DETAILS_FAILURE));
    }
  };
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

export const updateProject = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.UPDATE_PROJECT_REQUEST));
    try {
      await projectService.updateProject(data);

      dispatch(createAction(actionType.UPDATE_PROJECT_SUCCESS));

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionType.UPDATE_PROJECT_FAILURE));
    }
  };
};

export const deleteProject = (params, callback) => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const assignUserToProject = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.ASSIGN_USER_TO_PROJECT_REQUEST));
    try {
      await projectService.assignUserToProject(data);

      dispatch(createAction(actionType.ASSIGN_USER_TO_PROJECT_SUCCESS));

      if (callback) callback();
    } catch (err) {
      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(
            actionType.ASSIGN_USER_TO_PROJECT_FAILURE,
            err.response.data.content
          )
        );
      }
    }
  };
};

export const removeUserFromProject = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.REMOVE_USER_FROM_PROJECT_REQUEST));
    try {
      await projectService.removeUserFromProject(data);

      dispatch(createAction(actionType.REMOVE_USER_FROM_PROJECT_SUCCESS));

      if (callback) callback();
    } catch (err) {
      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(
            actionType.REMOVE_USER_FROM_PROJECT_FAILURE,
            err.response.data.content
          )
        );
      }
    }
  };
};
