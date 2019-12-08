import { combineReducers } from "redux";
import episodes from "./episodeReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  episodes,
  authors
});

export default rootReducer;
