import React from "react";
import { connect } from "react-redux";
import * as episodeActions from "../../redux/actions/episodeActions";
import PropTypes from "prop-types";

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
    this.props.dispatch(episodeActions.createEpisode(this.state.episode));
    alert(this.state.episode.title);
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
      </form>
    );
  }
}

EpisodesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    episodes: state.episodes
  };
}

export default connect(mapStateToProps)(EpisodesPage);
