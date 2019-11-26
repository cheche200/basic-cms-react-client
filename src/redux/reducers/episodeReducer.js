import * as types from "../actions/actionTypes";

export default function episodeReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_EPISODE:
      return [...state, { ...action.episode }];
    default:
      return state;
  }
}
