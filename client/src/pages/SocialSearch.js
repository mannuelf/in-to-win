import React, { useState, useEffect } from "react";

import {
  BASE_URL,
  USERS,
  IMG_URL,
  CUSTOMER_FRIENDS
} from "../constants/constants";
import axios from "axios";
import FollowFriendCard from "../components/FollowFriendCard";
import theme from "../GlobalStyle/Theme";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function SocialSearch() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
  };

  return (
    <div className="App">
      <Link to="/leaderboard" style={container_leaderboardBtn}>
        <button style={style_leaderboardBtn}>Leaderboard</button>
      </Link>
      <form style={style_form}>
        <h1 style={style_heading}>People to Follow</h1>
        <input
          type="text"
          name="search"
          placeholder="Search a person here..."
          className=""
          onChange={handleChange}
          style={style_searchInput}
        />
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

const { colors } = theme;

const style_cardDeck = {
  padding: "32px 16px 0"
};

const style_form = {
  margin: "0 16px"
};

const style_searchInput = {
  width: "100%",
  padding: "8px 0",
  fontSize: "16px",
  color: `${colors.text}`,
  backgroundColor: "transparent",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "2pt, solid, white"
};

const style_heading = {
  width: "100%",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "400",
  margin: "32px 0"
};

const container_leaderboardBtn = {
  position: "fixed",
  bottom: "11rem",
  left: "2rem"
};

const style_leaderboardBtn = {
  fontSize: "16px",
  padding: "16px",
  borderRadius: "50px",
  border: "none",
  backgroundColor: `${theme.colors.primary}`,
  shadowBox: `${theme.shadow}`
};

export default SocialSearch;
