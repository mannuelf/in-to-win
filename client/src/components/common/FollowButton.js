import React from "react";

function FollowButton({ id, onClick }) {
  return (
    <div>
      <button className="btn yellow-text" onClick={() => onClick(id)}>
        Follow
      </button>
    </div>
  );
}

export default FollowButton;
