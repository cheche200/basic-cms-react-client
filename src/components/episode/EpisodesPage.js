import React from "react";
import { connect } from "react-redux";
import * as episodeActions from "../../redux/actions/episodeActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class EpisodesPage extends React.Component {
  state = {
    episode: {
      title: ""
    }
  };

  handleChange = event => {
    const episode = { ...this.state.episode, title: event.target.value };
    this.setState({ episode });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createEpisode(this.state.episode);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Episodes</h2>
        <h3>Add episode</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.episode.title}
        />
        <input type="submit" value="Save" />
        {this.props.episodes.map(episode => (
          <div key={episode.title}>{episode.title}</div>
        ))}
      </form>
    );
  }
}

EpisodesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    episodes: state.episodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(episodeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesPage);
