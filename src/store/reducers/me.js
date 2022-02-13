import { actionType } from "../actions/type";

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SIGN_IN_SUCCESS:
      state = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
