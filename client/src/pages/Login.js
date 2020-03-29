import React, { useState } from "react";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

import { BASE_URL, AUTH_URL } from "../constants/constants";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Top = styled.div`

`;

const ColouredSpan = styled.span`
  color: ${theme.colors.primary};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  max-height: 500px;
  background-color: ${theme.colors.grey};
  margin-bottom: -32px;
  border-radius: 40px 40px 0 0;
`;

const FormCont = styled.div`
  max-width: 200px;
  padding: 50px 0;
  
`;

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
        window.location.reload();
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
    <Section>
      <Top>
        <h1>InToWin</h1>
        <span>The more <ColouredSpan>you in</ColouredSpan>, the more <ColouredSpan>you win</ColouredSpan>.</span>
      </Top>
      <Bottom>
        <FormCont>
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
            <Button
              as="input"
              primary
              wide
              type="submit"
              name="submit"
              value="Log in"
            />
          </form>
        </FormCont>
      </Bottom>

    </Section>
  );
}

export default Login;
