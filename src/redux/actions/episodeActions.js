import * as types from "./actionTypes";
import * as episodeApi from "../../api/episodeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadEpisodesSuccess(episodes) {
  return { type: types.LOAD_EPISODES_SUCCESS, episodes };
}

export function updateEpisodeSuccess(episode) {
  return { type: types.UPDATE_EPISODE_SUCCESS, episode };
}

export function createEpisodeSuccess(episode) {
  return { type: types.CREATE_EPISODE_SUCCESS, episode };
}

export function deleteEpisodeOptimistic(episode) {
  return { type: types.DELETE_EPISODE_OPTIMISTIC, episode };
}

export function loadEpisodes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return episodeApi
      .getEpisodes()
      .then(episodes => {
        dispatch(loadEpisodesSuccess(episodes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveEpisode(episode) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch) {
    dispatch(beginApiCall());
    return episodeApi
      .saveEpisode(episode)
      .then(savedEpisode => {
        episode.id
          ? dispatch(updateEpisodeSuccess(savedEpisode))
          : dispatch(createEpisodeSuccess(savedEpisode));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteEpisode(episode) {
  return function(dispatch) {
    dispatch(deleteEpisodeOptimistic(episode));
    return episodeApi.deleteEpisode(episode.id);
  };
}
