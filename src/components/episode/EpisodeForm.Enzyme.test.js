import React from "react";
import EpisodeForm from "./EpisodeForm";
import { shallow } from "enzyme";

function renderEpisodeForm(args) {
  const defaultProps = {
    authors: [],
    episode: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<EpisodeForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderEpisodeForm();
  //console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Episode");
});

it('should set label "Save" to button when not saving', () => {
  const wrapper = renderEpisodeForm();

  expect(wrapper.find("button").text()).toBe("Save");
});

it('should set label "Saving..." to button when is saving', () => {
  const wrapper = renderEpisodeForm({ saving: true });

  expect(wrapper.find("button").text()).toBe("Saving...");
});
