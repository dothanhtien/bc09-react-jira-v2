import { commentService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const insertComment = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.INSERT_COMMENT_REQUEST));
    try {
      await commentService.insertComment(data);
      dispatch(createAction(actionType.INSERT_COMMENT_SUCCESS));

      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.INSERT_COMMENT_FAILURE));
    }
  };
};

export const updateComment = ({ id, contentComment }, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.UPDATE_COMMENT_REQUEST));
    try {
      await commentService.updateComment(id, contentComment);
      dispatch(createAction(actionType.UPDATE_COMMENT_SUCCESS));
      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.UPDATE_COMMENT_FAILURE));
    }
  };
};

export const deleteComment = (commentId, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.DELETE_COMMENT_REQUEST));
    try {
      await commentService.deleteComment(commentId);
      dispatch(createAction(actionType.DELETE_COMMENT_SUCCESS));
      if (callback) callback();
    } catch (err) {
      dispatch(createAction(actionType.DELETE_COMMENT_FAILURE));
    }
  };
};
