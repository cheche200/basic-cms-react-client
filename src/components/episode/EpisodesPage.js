import React from "react";
import { connect } from "react-redux";
import * as episodeActions from "../../redux/actions/episodeActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import EpisodeList from "./EpisodeList";

class EpisodesPage extends React.Component {
  componentDidMount() {
    const { actions, episodes, authors } = this.props;
    if (episodes.length === 0) {
      actions.loadEpisodes().catch(error => {
        alert("Loading episodes failed:" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed:" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Episodes</h2>
        <EpisodeList episodes={this.props.episodes} />
      </>
    );
  }
}

EpisodesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
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
