import React, { useState } from "react";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

import { BASE_URL, AUTH_URL } from "../constants/constants";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 5px 5px 0 0;
  background-color: ${theme.colors.grey};
  width: 100%;
  max-height: 800px;
`;


const ColouredSpan = styled.span``;
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
        sessionStorage.setItem("User", JSON.stringify(response.data.user));
        updateLoginStatus();
        window.location = "/";
      })
      .catch(() => {
        updateErrors();
      });
  };

  const handleChange = input => {
    let name = input.target.name;
    let value = input.target.value.toLowerCase();
    name === "username" ? setUsername(value) : setPassword(value);
  };

  return (
    <div>
      <h1>InToWin</h1>
      <span>The more you in, the more you win.</span>
      <div>
        <Form onSubmit={handleSubmit}>
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
          <Button
            as="input"
            primary
            wide
            type="submit"
            name="submit"
            value="Log in"
          />
        </Form>
      </div>
    </div>
  );
}

export default Login;
