import episodeReducer from "./episodeReducer";
import * as actions from "../actions/episodeActions";

it("should add episode when passed CREATE_EPISODE_SUCCESS", () => {
  const initialState = [{ title: "A" }, { title: "B" }];
  const newEpisode = {
    title: "C"
  };

  const action = actions.createEpisodeSuccess(newEpisode);

  const newState = episodeReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update episode when passed UPDATE_EPISODE_SUCCESS", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];
  const episode = {
    id: 2,
    title: "New Title"
  };

  const action = actions.updateEpisodeSuccess(episode);

  const newState = episodeReducer(initialState, action);
  const updatedEpisode = newState.find(a => a.id == episode.id);

  expect(updatedEpisode.title).toEqual("New Title");
  expect(newState.length).toEqual(3);
});
