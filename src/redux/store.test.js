import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as episodeActions from "./actions/episodeActions";

it("should handle creating episodes", function() {
  const store = createStore(rootReducer, initialState);

  const episode = { tittle: "Clean Code" };

  const action = episodeActions.createEpisodeSuccess(episode);

  store.dispatch(action);

  const createdEpisode = store.getState().episodes[0];
  expect(createdEpisode).toEqual(episode);
});
