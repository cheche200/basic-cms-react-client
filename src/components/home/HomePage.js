import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
        <h1>Demo Admin</h1>
        <p>Demo description</p>
        <Link to="about" className="btn btn-primary btn-lg">
            Learn more
        </Link>
    </div>
);

export default HomePage;