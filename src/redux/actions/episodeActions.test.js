import * as episodeActions from "./episodeActions";
import * as types from "./actionTypes";
import { episodes } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_EPISODE_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: episodes,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        {
          type: types.BEGING_API_CALL
        },
        {
          type: types.LOAD_EPISODES_SUCCESS,
          episodes
        }
      ];

      const store = mockStore({ episodes: [] });

      return store.dispatch(episodeActions.loadEpisodes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createEpisodeSuccess", () => {
  it("should create a CREATE_EPISODE_SCUCCESS action", () => {
    const episode = episodes[0];
    const expectedAction = {
      type: types.CREATE_EPISODE_SUCCESS,
      episode
    };

    const action = episodeActions.createEpisodeSuccess(episode);

    expect(action).toEqual(expectedAction);
  });
});
