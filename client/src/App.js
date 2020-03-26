import React, { useState } from "react";
import Login from "./pages/Login";
import { Link } from "react-router-dom";
import "./App.scss";

function App({ children }) {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = () => {
    setisUserLoggedIn(true);
  };
  const handleErrors = () => {
    setErrorMessage("Please check your credentials");
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setisUserLoggedIn(false);
  };

  return (
    <div className="App">
      {isUserLoggedIn && sessionStorage.getItem("JWT") !== null ? (
        <div>
          <Link to="/">Home</Link>
          <Link to="/affliates">Affliates</Link>
          <button onClick={handleLogout}>Logout</button>
          {children}
        </div>
      ) : (
        <div>
          <p>{errorMessage}</p>
          <Login updateLoginStatus={handleLogin} updateErrors={handleErrors} />
        </div>
      )}
    </div>
  );
}

export default App;
