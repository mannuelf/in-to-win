import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import GlobalStyle from "./GlobalStyle/GlobalStyles";

import "././scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import Home from "././pages/Home";
import Affiliate from "././pages/Affiliates";
import AskCoronaGo from "././pages/AskCoronaGo";
import Leaderboard from "././pages/Leaderboard";
import Profile from "./pages/Profile";
import TaskFileUploader from "./pages/FileUpload";
import APITest from "./pages/APITest";
import AffiliateSpecific from "./pages/AffiliateSpecific";

import * as serviceWorker from "./serviceWorker";
import Friends from "./pages/Friends";

ReactDOM.render(
  <>
    <GlobalStyle />
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/affiliates" component={Affiliate} />
          <Route path="/affiliatespecific/:id" component={AffiliateSpecific} />
          <Route path="/ask-corona-go" component={AskCoronaGo} />
          <Route path="/user" component={Friends} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/fileupload" component={TaskFileUploader} />
          <Route path="/apitest" component={APITest} />
        </Switch>
      </App>
    </Router>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
