import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import EpisodesPage from "./episode/EpisodesPage";
import ManageEpisodesPage from "./episode/ManageEpisodesPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/episodes" component={EpisodesPage} />
        <Route path="/episode/:slug" component={ManageEpisodesPage} />
        <Route path="/episode" component={ManageEpisodesPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
