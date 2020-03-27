import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle/GlobalStyles";

import "././scss/styles.scss";

import App from "./App";
import Home from "././pages/Home";
import Affiliate from "././pages/Affiliates";
import AskCoronaGo from "././pages/AskCoronaGo";
import SocialSearch from "././pages/SocialSearch";
import Leaderboard from "././pages/Leaderboard";
import Profile from "./pages/Profile";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/affiliates" component={Affiliate} />
          <Route path="/ask-corona-go" component={AskCoronaGo} />
          <Route path="/search-for-a-friend" component={SocialSearch} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
