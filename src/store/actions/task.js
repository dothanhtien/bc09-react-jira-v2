import { createAction } from ".";
import { actionType } from "./type";
import { taskService } from "../../services";

export const fetchTaskTypes = async (dispatch) => {
  dispatch(createAction(actionType.FETCH_TASK_TYPES_REQUEST));
  try {
    const res = await taskService.fetchTaskTypes();

    dispatch(
      createAction(actionType.FETCH_TASK_TYPES_SUCCESS, res.data.content)
    );
  } catch (err) {
    dispatch(createAction(actionType.FETCH_TASK_TYPES_FAILURE));
  }
};

export const createTask = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.CREATE_TASK_REQUEST));
    try {
      await taskService.createTask(data);

      dispatch(createAction(actionType.CREATE_TASK_SUCCESS));

      if (callback) callback();
    } catch (err) {
      dispatch(
        createAction(actionType.CREATE_TASK_FAILURE, err.response.data.content)
      );
    }
  };
};

export const updateTaskStatus = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.UPDATE_TASK_STATUS_REQUEST));
    try {
      await taskService.updateTaskStatus(data);

      dispatch(createAction(actionType.UPDATE_TASK_STATUS_SUCCESS));

      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.UPDATE_TASK_STATUS_FAILURE));
    }
  };
};

export const updateTask = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.UPDATE_TASK_REQUEST));
    try {
      await taskService.updateTask(data);
      dispatch(createAction(actionType.UPDATE_TASK_SUCCESS));

      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.UPDATE_TASK_FAILURE));
    }
  };
};

export const deleteTask = (taskId, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.DELETE_TASK_REQUEST));
    try {
      await taskService.deleteTask(taskId);
      dispatch(createAction(actionType.DELETE_TASK_SUCCESS));

      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.DELETE_TASK_FAILURE));
    }
  };
};
