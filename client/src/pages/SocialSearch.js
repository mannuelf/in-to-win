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
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + USERS).then(results => {
      axios.get(BASE_URL + CUSTOMER_FRIENDS).then(friendResults => {
        handleFiltering(results.data, friendResults.data);
      });
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

  const handleFollow = friendid => {
    let user = JSON.parse(sessionStorage.getItem("User"));
    console.log(friendid.toString(), user.id.toString());
    axios
      .post(BASE_URL + CUSTOMER_FRIENDS, {
        friendNumber: friendid.toString(),
        userNumber: user.id.toString()
      })
      .then(response => {
        console.log(response.data);
      });
  };

  const handleFiltering = (one, two) => {
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    //console.log("handle filtering, users", one);
    console.log("handle filtering, userFriends", currentUser.id);
    let removedCurrentUser = one.filter(value => {
      return value.id !== currentUser.id;
    });
    let showAllCurrentUserFriends = two.filter(value => {
      return value.userNumber === currentUser.id.toString();
    });
    let array = removedCurrentUser.filter(item => {
      return (
        showAllCurrentUserFriends.filter(item2 => {
          return item.id.toString() == item2.friendNumber;
        }).length == 0
      );
    });

    setUsers(array);

    console.log(array);
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
                onFollow={handleFollow}
                label="Score"
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
