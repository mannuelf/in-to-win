import React from "react";
import FollowButton from "./common/FollowButton";

function FollowFriendCard({ image, name, score, onClick }) {
  return (
    <div className="follow-friend-card" style={style_FFC}>
      <img src={image} alt={name} style={style_IMG} />
      <div className="score">
        Score: <span className="yellow-dark-text-">{score}</span>
      </div>
      <FollowButton onClick={onClick} />
    </div>
  );
}
const style_FFC = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  backgroundColor: "black",
  color: "white"
};

const style_IMG = {
  width: "32px",
  height: "32px",
  backgroundSize: "100%",
  borderRadius: "50%"
};

export default FollowFriendCard;
