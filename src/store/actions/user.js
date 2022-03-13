import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchUsers = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_USERS_REQUEST));
    try {
      const res = await userService.fetchUsers(params);
      
      dispatch(createAction(actionType.FETCH_USERS_SUCCESS, res.data.content));
    } catch (err) {
      dispatch(createAction(actionType.FETCH_USERS_FAILURE));
    }
  };
};
