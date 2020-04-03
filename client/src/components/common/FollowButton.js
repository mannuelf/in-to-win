import React from "react";

function FollowButton({ id, onFollow, isFollowing }) {
  return (
    <div>
      <button
        className="btn yellow-text"
        style={style_button}
        onClick={() => onFollow(id)}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

const style_button = {
  color: "#FFB444",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "16px",
  marginTop: "3px",
  cursor: "pointer",
  outline: "none"
};

export default FollowButton;
