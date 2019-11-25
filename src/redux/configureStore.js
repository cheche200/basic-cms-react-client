import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxInmmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for Redux dev

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxInmmutableStateInvariant()))
  );
}
