import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import initialState from "./initialState";
import eventReducer from "./eventRedux";

const subreducers = {
  data: eventReducer,
};

const reducer = combineReducers(subreducers);

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
