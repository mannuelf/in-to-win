import React from "react";

function FollowButton({ onClick }) {
  return (
    <div>
      <button className="btn yellow-text" onClick={e => onClick(e)}>
        Follow
      </button>
    </div>
  );
}

export default FollowButton;
