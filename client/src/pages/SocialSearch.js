import React, { useState, useEffect } from "react";

import { BASE_URL, USERS } from "../constants/constants";
import axios from "axios";

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
              <div key={key}>
                {value.username}, {value.points}
              </div>
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
