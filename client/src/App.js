import React from "react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You just got hacked by:</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jonmar Tamon && Clinton Moodle Pumba
        </a>
      </header>
    </div>
  );
}

export default App;
