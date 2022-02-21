import { createAction } from ".";
import { actionType } from "./type";
import { authService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants/appConfig";

export const signIn = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SIGN_IN_REQUEST));
    try {
      const res = await authService.signIn(data);

      dispatch(createAction(actionType.SIGN_IN_SUCCESS, res.data.content));
      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(
        createAction(actionType.SIGN_IN_FAILURE, err.response.data.message)
      );
    }
  };
};

export const signUp = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SIGN_UP_REQUEST));
    try {
      await authService.signUp(data);

      dispatch(createAction(actionType.SIGN_UP_SUCCESS));

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(
        createAction(actionType.SIGN_UP_FAILURE, err.response.data.message)
      );
    }
  };
};
