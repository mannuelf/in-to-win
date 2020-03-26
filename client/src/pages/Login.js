import React, { useState } from "react";
import axios from "axios";

import { BASE_URL, AUTH_URL } from "../constants/constants";

function Login({ updateErrors, updateLoginStatus }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(BASE_URL + AUTH_URL, {
        identifier: username,
        password: password
      })
      .then(response => {
        sessionStorage.setItem("JWT", response.data.jwt);
        updateLoginStatus();
      })
      .catch(() => {
        updateErrors();
      });
  };

  const handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Username</h2>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className=""
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className=""
          />
          <input type="submit" name="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
