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
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((value, key) => {
            return (
              <FollowFriendCard
                key={key}
                name={value.username}
                image={IMG_URL + value.profileimage[0].url}
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

export default SocialSearch;