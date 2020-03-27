import React, { useState, useEffect } from "react";

import axios from "axios";
import { BASE_URL, USERS, IMG_URL } from "../constants/constants";
import FollowFriendCard from "../components/FollowFriendCard";

function Leaderboard() {
  const [leaderboard, setLeaderboared] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + USERS).then(response => {
      setLeaderboared(response.data.sort(compareValues("points", "desc")));
    });
  }, []);

  const compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  return (
    <div className="App" style={style}>
      <h1>Leader Board</h1>
      {leaderboard.length > 0 ? (
        leaderboard.map((value, index) => {
          let img;
          value.profileimage.length > 0
            ? (img = IMG_URL + value.profileimage[0].url)
            : (img =
                "https://i7.pngguru.com/preview/117/435/819/user-silhouette-my-account-icon.jpg");
          return (
            <FollowFriendCard
              key={index}
              id={value.id}
              image={img}
              username={value.username}
              rank={index + 1}
              label="Rank"
            />
          );
        })
      ) : (
        <div>Data is loading be patient</div>
      )}
    </div>
  );
}

const style = {
  margin: "0 16px"
};

export default Leaderboard;
