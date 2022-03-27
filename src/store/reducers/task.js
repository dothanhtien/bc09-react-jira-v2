import { actionType } from "../actions/type";

const initialState = {
  taskTypes: [],
  taskDetails: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_TASK_TYPES_SUCCESS:
      state.taskTypes = payload;
      return { ...state };
    case actionType.FETCH_TASK_DETAILS_SUCCESS:
      state.taskDetails = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
