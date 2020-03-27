import React, { useState, useEffect } from "react";

import { BASE_URL, USERS } from "../constants/constants";
import axios from "axios";
import FollowFriendCard from "../components/FollowFriendCard";

function SocialSearch(props) {
  const { name, image, score } = props;

  useEffect(() => {
    axios.get(BASE_URL + USERS).then(results => {
      console.log(results);
    });
  }, []);
  const handleChange = input => {};
  const handleFollow = e => {
    e.target.textContent === "Follow"
      ? (e.target.textContent = "Unfollow")
      : (e.target.textContent = "Follow");
  };

  return (
    <div className="App">
      <h1>Search For a Friend</h1>
      <form>
        <input type="text" name="search" className="" onChange={handleChange} />
      </form>
      <div className="card-deck">
        <FollowFriendCard
          image={image}
          score={score}
          name={[name]}
          onClick={handleFollow}
        />
      </div>
    </div>
  );
}

FollowFriendCard.defaultProps = {
  name: "user",
  image:
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2776&q=80",
  score: "2 354"
};

export default SocialSearch;
