import React, { useState, useEffect } from "react";

import {
  BASE_URL,
  USERS,
  IMG_URL,
  CUSTOMER_FRIENDS
} from "../constants/constants";
import axios from "axios";
import FollowFriendCard from "../components/FollowFriendCard";

function SocialSearch() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + USERS).then(results => {
      setUsers(results.data);
    });
  }, []);

  const handleChange = input => {
    let filteredArray = users.filter((value, index) => {
      return value.username
        .toLowerCase()
        .includes(input.target.value.toLowerCase());
    });
    setFilteredUsers(filteredArray);
  };

  const handleClick = friendid => {
    let user = JSON.parse(sessionStorage.getItem("User"));
    axios
      .post(BASE_URL + CUSTOMER_FRIENDS, {
        friendid: friendid.toString(),
        userid: user.id.toString()
      })
      .then(response => {
        console.log(response.data);
      });
  };

  return (
    <div className="App">
      <h1>Search For a Friend</h1>
      <form>
        <input type="text" name="search" className="" onChange={handleChange} />
      </form>
      <div style={style_cardDeck}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((value, key) => {
            let img;
            value.profileimage.length > 0
              ? (img = IMG_URL + value.profileimage[0].url)
              : (img =
                  "https://i7.pngguru.com/preview/117/435/819/user-silhouette-my-account-icon.jpg");
            return (
              <FollowFriendCard
                key={key}
                id={value.id}
                username={value.username}
                image={img}
                score={value.points}
                onClick={handleClick}
              />
            );
          })
        ) : (
          <div>There are no users with the name searched</div>
        )}
      </div>
    </div>
  );
}

const style_cardDeck = {
  padding: "32px 16px 0"
};

export default SocialSearch;
