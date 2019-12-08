import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EpisodeList = ({ episodes }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {episodes.map(episode => {
        return (
          <tr key={episode.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/courses/" + episode.slug}
              >
                Listen
              </a>
            </td>
            <td>
              <Link to={"/episode/" + episode.slug}>{episode.title}</Link>
            </td>
            <td>{episode.authorName}</td>
            <td>{episode.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

EpisodeList.propTypes = {
  episodes: PropTypes.array.isRequired
};

export default EpisodeList;
