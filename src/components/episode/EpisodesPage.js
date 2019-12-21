import React from "react";
import { connect } from "react-redux";
import * as episodeActions from "../../redux/actions/episodeActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import EpisodeList from "./EpisodeList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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

  handleDeleteEpisode = async episode => {
    toast.success("Episode deleted");
    try {
      await this.props.actions.deleteEpisode(episode);
    } catch (error) {
      toast.error("Delete failed" + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddEpisodesPage && <Redirect to="/episode" />}
        <h2>Episodes</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-episode"
              onClick={() => this.setState({ redirectToAddEpisodesPage: true })}
            >
              Add Episode
            </button>
            <EpisodeList
              onDeleteClick={this.handleDeleteEpisode}
              episodes={this.props.episodes}
            />
          </>
        )}
      </>
    );
  }
}

EpisodesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  episodes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
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
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadEpisodes: bindActionCreators(episodeActions.loadEpisodes, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteEpisode: bindActionCreators(episodeActions.deleteEpisode, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesPage);
