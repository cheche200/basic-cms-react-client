import { combineReducers } from "redux";
import episodes from "./episodeReducer";

const rootReducer = combineReducers({
  episodes
});

export default rootReducer;
