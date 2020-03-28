import React, { useState } from "react";

import Login from "./pages/Login";

import { Link } from "react-router-dom";
import { IMG_URL } from "./constants/constants";

import styled from "styled-components";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import HeaderCard from "././components/HeaderCard";
import AskCoronaGo from "././pages/AskCoronaGo";

import Modal from "react-responsive-modal";

const ErrorComp = styled.p``;

const LoginCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin-top: -16px;
  text-align: center;
`;

function App(props) {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

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

  const onOpenModal = () => {
    setShowDialog(true);
  };

  const onCloseModal = () => {
    setShowDialog(false);
  };

  return (
    <div className="App">
      {isUserLoggedIn && sessionStorage.getItem("JWT") !== null ? (
        <div>
          {/* <Link to="/">Home</Link>
          <Link to="/affiliates">affiliates</Link>
          <Link to="/ask-corona-go">Get your facts straight</Link>
          <Link to="/search-for-a-friend">Find a Friend</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/fileupload">Test Link</Link> */}
          <Modal open={showDialog} onClose={onCloseModal}>
            <AskCoronaGo />
          </Modal>
          <button onClick={handleLogout}>Logout</button>
          {props.children}
          <Toast
            title="Hello there"
            text="It's over, Anakin! I have the high ground!"
            canCancel
          />
          <button onClick={onOpenModal}>Open modal</button>
          <Navbar />
        </div>
      ) : (
        <LoginCont>
          <Login updateLoginStatus={handleLogin} updateErrors={handleErrors} />
          <ErrorComp>{errorMessage}</ErrorComp>
        </LoginCont>
      )}
    </div>
  );
}

export default App;
