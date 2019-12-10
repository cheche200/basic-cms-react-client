import React from "react";
import { connect } from "react-redux";
import * as episodeActions from "../../redux/actions/episodeActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import EpisodeList from "./EpisodeList";
import { Redirect } from "react-router-dom";

class EpisodesPage extends React.Component {
  state = {
    redirectToAddEpisodesPage: false
  };

  componentDidMount() {
    const { episodes, authors, actions } = this.props;

    if (episodes.length === 0) {
      actions.loadEpisodes().catch(error => {
        alert("Loading episodes failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddEpisodesPage && <Redirect to="/episode" />}
        <h2>Episodes</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-episode"
          onClick={() => this.setState({ redirectToAddEpisodesPage: true })}
        >
          Add Episode
        </button>

        <EpisodeList episodes={this.props.episodes} />
      </>
    );
  }
}

EpisodesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  episodes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    episodes:
      state.authors.length === 0
        ? []
        : state.episodes.map(episode => {
            return {
              ...episode,
              authorName: state.authors.find(a => a.id === episode.authorId)
                .name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadEpisodes: bindActionCreators(episodeActions.loadEpisodes, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesPage);
