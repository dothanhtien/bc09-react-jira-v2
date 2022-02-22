import { actionType } from "../actions/type";

const initialState = {
  projects: [],
  projectCategories: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_ALL_PROJECTS_SUCCESS:
      state.projects = payload;
      return { ...state };
    case actionType.FETCH_PROJECT_CATEGORIES_SUCCESS:
      state.projectCategories = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;