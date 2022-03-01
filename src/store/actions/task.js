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

export const createTask = (data) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.CREATE_TASK_REQUEST));
    try {
      await taskService.createTask(data);

      dispatch(createAction(actionType.CREATE_TASK_SUCCESS));
    } catch (err) {
      dispatch(
        createAction(actionType.CREATE_TASK_FAILURE, err.response.data.content)
      );
    }
  };
};