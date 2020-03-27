import React, { useState, useEffect } from "react";

import { BASE_URL, USERS, IMG_URL } from "../constants/constants";
import axios from "axios";
import FollowFriendCard from "../components/FollowFriendCard";

function SocialSearch() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + USERS).then(results => {
      console.log(results.data);
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

  const handleClick = () => {
    console.log("Jonmar sucks");
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
            return (
              <FollowFriendCard
                key={key}
                username={value.username}
                image={
                  value.profileimage[0]
                    ? IMG_URL + value.profileimage[0].url
                    : null
                }
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
