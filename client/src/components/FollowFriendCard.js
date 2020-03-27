import React from "react";
import FollowButton from "./common/FollowButton";

function FollowFriendCard({ image, username, score, onClick }) {
  console.log(image);
  return (
    <div className="follow-friend-card" style={style_FFC}>
      <img src={image} alt={username} style={style_IMG} />
      <div style={style_IMG}></div>
      <div style={style_leftColumn}>
        <div className="userName" style={style_username}>
          @{username}
        </div>
        <div className="score" style={style_score}>
          Score:{" "}
          <span className="yellow-dark-text-" style={style_yellowText}>
            {score ? score : "0"}
          </span>
        </div>
      </div>
      <FollowButton onClick={onClick} />
    </div>
  );
}
const style_FFC = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  color: "white",
  fontSize: "16px",
  borderRadius: "10px",
  marginBottom: "8px",
  backgroundColor: "#3B4046",
  boxShadow: "0px 4px 16px rgba(0,0,0,.25)"
};

const style_IMG = {
  width: "32px",
  height: "32px",
  backgroundSize: "100%",
  backgroundColor: "#FFB444",
  borderRadius: "50%"
};

const style_leftColumn = {
  width: "60%",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "3px",
  textAlign: "left"
};

const style_username = {
  textTransform: "lowercase"
};

const style_score = {
  width: "50%"
};

const style_yellowText = {
  color: "#FFB444"
};

export default FollowFriendCard;
