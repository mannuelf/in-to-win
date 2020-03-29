import React, { useState } from "react";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

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
    let value = input.target.value;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  return (
    <div>
      <div className="logo-container" style={style_logoContainer}>
        <h1>InToWin</h1>
        <span>
          The more <span style={style_spanColor}>you in</span>, the more{" "}
          <span style={style_spanColor}>you win</span>.
        </span>
      </div>
      <div style={style_loginForm}>
        <h2 style={style_heading}>Log in</h2>
        <Form onSubmit={handleSubmit}>
          {" "}
          <LoginInput
            type="text"
            name="username"
            onChange={handleChange}
            className=""
            placeholder="Username"
          />
          <LoginInput
            type="password"
            name="password"
            onChange={handleChange}
            className=""
            placeholder="Password"
          />
          <Button
            as="input"
            primary
            wide
            type="submit"
            name="submit"
            value="Log in"
            style={style_loginButton}
          />
        </Form>
      </div>
    </div>
  );
}

const style_loginForm = {
  width: "100%",
  marginTop: "64px",
  height: "50vh",
  padding: "16px",
  boxSizing: "border-box",
  backgroundColor: `${theme.colors.grey}`,
  position: "absolute",
  bottom: "0",
  left: "0",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px"
};

const style_logoContainer = {
  width: "100%",
  paddingTop: "64px",
  height: "40vh",
  position: "absolute",
  top: "0",
  left: "0"
};

const style_spanColor = {
  color: `${theme.colors.primary}`
};

const style_heading = {
  width: "100%",
  textAlign: "center",
  fontSize: "25px",
  fontWeight: "400",
  margin: "20px 0 60px 0"
};

const LoginInput = styled.input`
  border: none;
  border-bottom: 2pt solid ${theme.colors.primary};
  background-color: transparent;
  width: 100%;
  padding-bottom: 5px;
  padding-left: 5px;
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: 16px;
  :focus {
    outline: none;
  }
`;

const Form = styled.form`
  border: 5px 5px 0 0;
  width: 100%;
  max-height: 800px;
  margin-bottom: 40px;
`;

const style_loginButton = {
  marginTop: "30px"
};

export default Login;
