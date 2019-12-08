import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/episodes/";

export function getEpisodes() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveEpisode(episode) {
  return fetch(baseUrl + (episode.id || ""), {
    method: episode.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(episode)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteEpisode(episodeId) {
  return fetch(baseUrl + episodeId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
