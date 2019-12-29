import React from "react";
import { mount } from "enzyme";
import { authors, newEpisode, episodes } from "../../../tools/mockData";
import { ManageEpisodesPage } from "./ManageEpisodesPage";

function render(args) {
  const defaultProps = {
    authors,
    episodes,
    history: {},
    saveEpisode: jest.fn(),
    loadAuthors: jest.fn(),
    loadEpisodes: jest.fn(),
    episode: newEpisode,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageEpisodesPage {...props} />);
}

it("sets an error when trying to save an episode with empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required");
});
