import React from "react";
import { cleanup, render } from "react-testing-library";
import EpisodeForm from "./EpisodeForm";

afterEach(cleanup);

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
  return render(<EpisodeForm {...props} />);
}

it("should render Add Episode header", () => {
  const { getByText } = renderEpisodeForm();

  getByText("Add Episode");
});

it("should set button label to 'Save' when it's not saving", () => {
  const { getByText } = renderEpisodeForm();
  getByText("Save");
});

it("should set button label to 'Saving...' when it's saving", () => {
  const { getByText } = renderEpisodeForm({ saving: true });
  getByText("Saving...");
});
