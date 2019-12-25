import React from "react";
import EpisodeForm from "./EpisodeForm";
import renderer from "react-test-renderer";
import { episodes, authors } from "../../../tools/mockData";
import { JestEnvironment } from "@jest/environment";
import { exportAllDeclaration } from "@babel/types";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <EpisodeForm
      episode={episodes[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <EpisodeForm
      episode={episodes[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
