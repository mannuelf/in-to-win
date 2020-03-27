import React from "react";

function FollowButton({ id, onFollow }) {
  return (
    <div>
      <button
        className="btn yellow-text"
        style={style_button}
        onClick={() => onFollow(id)}
      >
        Follow
      </button>
    </div>
  );
}

const style_button = {
  color: "#FFB444",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "16px",
  marginTop: "3px"
};

export default FollowButton;
