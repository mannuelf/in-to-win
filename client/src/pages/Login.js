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
    let value = input.target.value.toLowerCase();
    name === "username" ? setUsername(value) : setPassword(value);
  };

  return (
    <div>
      <div className="logo-container" style={style_logoContainer}>
        <h1>InToWin</h1>
        <span>The more <span style={style_spanColor}>you in</span>, the more <span style={style_spanColor}>you win</span>.</span>
      </div>
      <div style={style_loginForm}>
        <h2 style={style_heading}>Log in</h2>
        <Form onSubmit={handleSubmit}>
          {" "}
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className=""
            placeholder="Username"
            style={style_loginInput}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className=""
            placeholder="Password"
            style={style_loginInput}
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
        <div style={style_policyCont}>
          <a href="" style={style_policy}>Privacy policy</a>
          <a href="" style={style_policy}>Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

const style_loginForm = {
  width: "100%",
  marginTop: "64px",
  height: "70vh",
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
}

const style_heading = {
  width: "100%",
  textAlign: "center",
  fontSize: "25px",
  fontWeight: "400",
  margin: "20px 0 60px 0"
};

const style_loginInput = {
  border: "none",
  borderBottom: `2pt solid ${theme.colors.primary}`,
  backgroundColor: "transparent",
  width: "100%",
  paddingBottom: "5px",
  paddingLeft: "5px",
  fontSize: "24px",
  color: `${theme.colors.text}`,
  marginBottom: "16px"
};

const Form = styled.form`
  border: 5px 5px 0 0;
  width: 100%;
  max-height: 800px;
  margin-bottom: 40px;
`;

const style_loginButton = {
  marginTop: "50px"
}

const style_policyCont = {
  position: "absolute",
  bottom: "20px",
  left: "0",
  width: "100%"
}

const style_policy = {
  margin: "30px",
  color: `${theme.colors.text}`,
  textDecoration: "none"
}

export default Login;
