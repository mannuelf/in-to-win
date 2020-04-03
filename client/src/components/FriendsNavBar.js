import React from "react";
import { StyledLink } from "./Navbar";

function FriendsNavBar({ onClick }) {
  return (
    <div style={style_container}>
      <StyledLink to="/user/friend-list" onClick={onClick}>
        <span style={style_heading}>Following</span>
      </StyledLink>

      <StyledLink to="/user/social-search" onClick={onClick}>
        <span style={style_heading}>People to Follow</span>
      </StyledLink>
    </div>
  );
}

const style_container = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around"
};

const style_heading = {
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "400",
  margin: "32px 0"
};

export default FriendsNavBar;
