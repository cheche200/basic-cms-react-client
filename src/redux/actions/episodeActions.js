import * as types from "./actionTypes";
import * as episodeApi from "../../api/episodeApi";

export function loadEpisodesSuccess(episodes) {
  return { type: types.LOAD_EPISODES_SUCCESS, episodes };
}

export function updateEpisodeSuccess(episode) {
  return { type: types.UPDATE_EPISODE_SUCCESS, episode };
}

export function createEpisodeSuccess(episode) {
  return { type: types.CREATE_EPISODE_SUCCESS, episode };
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

export function saveEpisode(episode) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch) {
    return episodeApi
      .saveEpisode(episode)
      .then(savedEpisode => {
        episode.id
          ? dispatch(updateEpisodeSuccess(savedEpisode))
          : dispatch(createEpisodeSuccess(savedEpisode));
      })
      .catch(error => {
        throw error;
      });
  };
}
