import React, { useState, useEffect } from "react";

import { BASE_URL, USERS } from "../constants/constants";
import axios from "axios";
import FollowFriendCard from "../components/FollowFriendCard";

function SocialSearch(props) {
  const { name, image, score } = props;

<<<<<<< HEAD
=======
function SocialSearch() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

>>>>>>> b6046694abb941daf10ffacd02f11fdcc3a974e9
  useEffect(() => {
    axios.get(BASE_URL + USERS).then(results => {
      console.log(results.data);
      setUsers(results.data);
    });
  }, []);
<<<<<<< HEAD
  const handleChange = input => {};
  const handleFollow = e => {
    e.target.textContent === "Follow"
      ? (e.target.textContent = "Unfollow")
      : (e.target.textContent = "Follow");
  };

=======

  const handleChange = input => {
    let filteredArray = users.filter((value, index) => {
      return value.username
        .toLowerCase()
        .includes(input.target.value.toLowerCase());
    });
    setFilteredUsers(filteredArray);
  };
>>>>>>> b6046694abb941daf10ffacd02f11fdcc3a974e9
  return (
    <div className="App">
      <h1>Search For a Friend</h1>
      <form>
        <input type="text" name="search" className="" onChange={handleChange} />
      </form>
<<<<<<< HEAD
      <div className="card-deck">
        <FollowFriendCard
          image={image}
          score={score}
          name={[name]}
          onClick={handleFollow}
        />
=======
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
>>>>>>> b6046694abb941daf10ffacd02f11fdcc3a974e9
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
