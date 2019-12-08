import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function episodeReducer(state = initialState.episodes, action) {
  switch (action.type) {
    case types.CREATE_EPISODE:
      return [...state, { ...action.episode }];
    case types.LOAD_EPISODES_SUCCESS:
      return action.episodes;
    default:
      return state;
  }
}
