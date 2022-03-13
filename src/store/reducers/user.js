import { actionType } from "../actions/type";

const initialState = {
  userList: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_USERS_SUCCESS:
      state.userList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
