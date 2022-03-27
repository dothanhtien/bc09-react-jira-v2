export const actionType = {
  // auth
  SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",

  SIGN_UP_REQUEST: "SIGN_UP_REQUEST",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE: "SIGN_UP_FAILURE",

  // project
  FETCH_ALL_PROJECTS_REQUEST: "FETCH_ALL_PROJECTS_REQUEST",
  FETCH_ALL_PROJECTS_SUCCESS: "FETCH_ALL_PROJECTS_SUCCESS",
  FETCH_ALL_PROJECTS_FAILURE: "FETCH_ALL_PROJECTS_FAILURE",

  FETCH_PROJECT_CATEGORIES_REQUEST: "FETCH_PROJECT_CATEGORIES_REQUEST",
  FETCH_PROJECT_CATEGORIES_SUCCESS: "FETCH_PROJECT_CATEGORIES_SUCCESS",
  FETCH_PROJECT_CATEGORIES_FAILURE: "FETCH_PROJECT_CATEGORIES_FAILURE",

  FETCH_PROJECT_MEMBERS_REQUEST: "FETCH_PROJECT_MEMBERS_REQUEST",
  FETCH_PROJECT_MEMBERS_SUCCESS: "FETCH_PROJECT_MEMBERS_SUCCESS",
  FETCH_PROJECT_MEMBERS_FAILURE: "FETCH_PROJECT_MEMBERS_FAILURE",

  FETCH_PROJECT_DETAILS_REQUEST: "FETCH_PROJECT_DETAILS_REQUEST",
  FETCH_PROJECT_DETAILS_SUCCESS: "FETCH_PROJECT_DETAILS_SUCCESS",
  FETCH_PROJECT_DETAILS_FAILURE: "FETCH_PROJECT_DETAILS_FAILURE",

  CREATE_PROJECT_REQUEST: "CREATE_PROJECT_REQUEST",
  CREATE_PROJECT_SUCCESS: "CREATE_PROJECT_SUCCESS",
  CREATE_PROJECT_FAILURE: "CREATE_PROJECT_FAILURE",

  UPDATE_PROJECT_REQUEST: "UPDATE_PROJECT_REQUEST",
  UPDATE_PROJECT_SUCCESS: "UPDATE_PROJECT_SUCCESS",
  UPDATE_PROJECT_FAILURE: "UPDATE_PROJECT_FAILURE",

  ASSIGN_USER_TO_PROJECT_REQUEST: "ASSIGN_USER_TO_PROJECT_REQUEST",
  ASSIGN_USER_TO_PROJECT_SUCCESS: "ASSIGN_USER_TO_PROJECT_SUCCESS",
  ASSIGN_USER_TO_PROJECT_FAILURE: "ASSIGN_USER_TO_PROJECT_FAILURE",

  REMOVE_USER_FROM_PROJECT_REQUEST: "REMOVE_USER_FROM_PROJECT_REQUEST",
  REMOVE_USER_FROM_PROJECT_SUCCESS: "REMOVE_USER_FROM_PROJECT_SUCCESS",
  REMOVE_USER_FROM_PROJECT_FAILURE: "REMOVE_USER_FROM_PROJECT_FAILURE",

  // task
  FETCH_TASK_TYPES_REQUEST: "FETCH_TASK_TYPES_REQUEST",
  FETCH_TASK_TYPES_SUCCESS: "FETCH_TASK_TYPES_SUCCESS",
  FETCH_TASK_TYPES_FAILURE: "FETCH_TASK_TYPES_FAILURE",

  FETCH_TASK_DETAILS_REQUEST: "FETCH_TASK_DETAILS_REQUEST",
  FETCH_TASK_DETAILS_SUCCESS: "FETCH_TASK_DETAILS_SUCCESS",
  FETCH_TASK_DETAILS_FAILURE: "FETCH_TASK_DETAILS_FAILURE",

  CREATE_TASK_REQUEST: "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS: "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE: "CREATE_TASK_FAILURE",

  UPDATE_TASK_STATUS_REQUEST: "UPDATE_TASK_STATUS_REQUEST",
  UPDATE_TASK_STATUS_SUCCESS: "UPDATE_TASK_STATUS_SUCCESS",
  UPDATE_TASK_STATUS_FAILURE: "UPDATE_TASK_STATUS_FAILURE",

  UPDATE_TASK_PRIORITY_REQUEST: "UPDATE_TASK_PRIORITY_REQUEST",
  UPDATE_TASK_PRIORITY_SUCCESS: "UPDATE_TASK_PRIORITY_SUCCESS",
  UPDATE_TASK_PRIORITY_FAILURE: "UPDATE_TASK_PRIORITY_FAILURE",

  UPDATE_TASK_DESCRIPTION_REQUEST: "UPDATE_TASK_DESCRIPTION_REQUEST",
  UPDATE_TASK_DESCRIPTION_SUCCESS: "UPDATE_TASK_DESCRIPTION_SUCCESS",
  UPDATE_TASK_DESCRIPTION_FAILURE: "UPDATE_TASK_DESCRIPTION_FAILURE",

  UPDATE_TASK_REQUEST: "UPDATE_TASK_REQUEST",
  UPDATE_TASK_SUCCESS: "UPDATE_TASK_SUCCESS",
  UPDATE_TASK_FAILURE: "UPDATE_TASK_FAILURE",

  DELETE_TASK_REQUEST: "DELETE_TASK_REQUEST",
  DELETE_TASK_SUCCESS: "DELETE_TASK_SUCCESS",
  DELETE_TASK_FAILURE: "DELETE_TASK_FAILURE",

  // comment
  INSERT_COMMENT_REQUEST: "INSERT_COMMENT_REQUEST",
  INSERT_COMMENT_SUCCESS: "INSERT_COMMENT_SUCCESS",
  INSERT_COMMENT_FAILURE: "INSERT_COMMENT_FAILURE",

  UPDATE_COMMENT_REQUEST: "UPDATE_COMMENT_REQUEST",
  UPDATE_COMMENT_SUCCESS: "UPDATE_COMMENT_SUCCESS",
  UPDATE_COMMENT_FAILURE: "UPDATE_COMMENT_FAILURE",

  DELETE_COMMENT_REQUEST: "DELETE_COMMENT_REQUEST",
  DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
  DELETE_COMMENT_FAILURE: "DELETE_COMMENT_FAILURE",

  // user
  FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
};
