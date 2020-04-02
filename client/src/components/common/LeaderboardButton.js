import React from "react";
import theme from "../../GlobalStyle/Theme";
import { Link } from "react-router-dom";

function LeaderboardButton() {
  return (
    <div>
      <Link to="/leaderboard" style={style_containerLeaderboardBtn}>
        <button style={style_leaderboardBtn}>Leaderboard</button>
      </Link>
    </div>
  );
}
const style_containerLeaderboardBtn = {
  position: "fixed",
  bottom: "11rem",
  left: "2rem"
};

const style_leaderboardBtn = {
  fontSize: "16px",
  padding: "16px",
  borderRadius: "50px",
  border: "none",
  backgroundColor: `${theme.colors.primary}`,
  shadowBox: `${theme.shadow}`
};
export default LeaderboardButton;
