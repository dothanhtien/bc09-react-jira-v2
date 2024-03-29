import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

// reducers
import auth from "./reducers/auth";
import me from "./reducers/me";
import project from "./reducers/project";
import task from "./reducers/task";
import user from "./reducers/user";
import loading from "./reducers/loading";
import error from "./reducers/error";

const reducer = combineReducers({
  auth,
  me,
  project,
  task,
  user,
  loading,
  error,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
