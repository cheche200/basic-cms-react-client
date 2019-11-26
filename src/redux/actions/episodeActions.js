import * as types from "./actionTypes";

export function createEpisode(episode) {
  return { type: types.CREATE_EPISODE, episode };
}
