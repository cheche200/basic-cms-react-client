import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadEpisodes, saveEpisode } from "../../redux/actions/episodeActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import EpisodeForm from "./EpisodeForm";
import { newEpisode } from "../../../tools/mockData";

function ManageEpisodesPage({
  episodes,
  authors,
  loadAuthors,
  loadEpisodes,
  saveEpisode,
  history,
  ...props
}) {
  const [episode, setEpisode] = useState({ ...props.episode });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (episodes.length === 0) {
      loadEpisodes().catch(error => {
        alert("Loading episodes failed" + error);
      });
    } else {
      setEpisode({ ...props.episode });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.episode]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEpisode(prevEpisode => ({
      ...prevEpisode,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveEpisode(episode)
      .then(() => {
        history.push("/episodes");
      })
      .catch(error => alert(error));
  }

  return (
    <EpisodeForm
      episode={episode}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageEpisodesPage.propTypes = {
  episode: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  episodes: PropTypes.array.isRequired,
  loadEpisodes: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveEpisode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getEpisodeBySlug(episodes, slug) {
  return episodes.find(episode => episode.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const episode =
    slug && state.episodes.length > 0
      ? getEpisodeBySlug(state.episodes, slug)
      : newEpisode;
  return {
    episode,
    episodes: state.episodes,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadEpisodes,
  loadAuthors,
  saveEpisode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageEpisodesPage);
