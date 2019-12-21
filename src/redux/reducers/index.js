import { combineReducers } from "redux";
import episodes from "./episodeReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  episodes,
  authors,
  apiCallsInProgress
});

export default rootReducer;
