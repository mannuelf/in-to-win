import React from "react";

function FollowFriendCard({ onClick }) {
  return (
    <div className="follow-friend-card">
      <img src="" alt="" />
      <div className="score">
        Score: <span className="yellow-dark-text-">2 439</span>
      </div>
      <button className="btn yellow-text" onClick={onClick}>
        Follow
      </button>
    </div>
  );
}

export default FollowFriendCard;
