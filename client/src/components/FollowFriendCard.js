import React from "react";
import FollowButton from "./common/FollowButton";
import theme from "../GlobalStyle/Theme";

function FollowFriendCard({
  image,
  username,
  score,
  rank,
  onFollow,
  onUnfollow,
  isFollowing,
  id,
  label
}) {
  const userScore = score ? score : 0;

  return (
    <div className="follow-friend-card" style={style_FFC}>
      <img src={image} alt={username} style={style_IMG} />
      <div style={style_leftColumn}>
        <div className="userName" style={style_username}>
          @{username}
        </div>
        <div className="score" style={style_score}>
          {label}:{" "}
          <span className="yellow-dark-text-" style={style_yellowText}>
            {userScore || rank}
          </span>
        </div>
      </div>
      <FollowButton
        id={id}
        onFollow={isFollowing ? onUnfollow : onFollow}
        isFollowing={isFollowing}
      />
    </div>
  );
}

const { colors, gradient, shadow } = theme;

const style_FFC = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  color: `${colors.text}`,
  fontSize: "16px",
  borderRadius: "10px",
  marginBottom: "8px",
  background: `${gradient}`,
  boxShadow: `${shadow}`
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
  width: "50%",
  opacity: "70%"
};

const style_yellowText = {
  color: "#FFB444"
};

export default FollowFriendCard;
