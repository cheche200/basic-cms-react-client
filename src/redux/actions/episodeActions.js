import * as types from "./actionTypes";
import * as episodeApi from "../../api/episodeApi";

export function createEpisode(episode) {
  return { type: types.CREATE_EPISODE, episode };
}

export function loadEpisodesSuccess(episodes) {
  return { type: types.LOAD_EPISODES_SUCCESS, episodes };
}

export function loadEpisodes() {
  return function(dispatch) {
    return episodeApi
      .getEpisodes()
      .then(episodes => {
        dispatch(loadEpisodesSuccess(episodes));
      })
      .catch(error => {
        throw error;
      });
  };
}
