import React from "react";

import { IMG_URL } from "../constants/constants";
import FollowFriendCard from "../components/FollowFriendCard";

function SocialSearch({ onFollow, unfollowedUsers }) {
  return (
    <div className="App" style={style_container}>
      <div>
        {unfollowedUsers ? (
          unfollowedUsers.map((value, key) => {
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
                onFollow={onFollow}
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

const style_container = {
  margin: "32px 0 0"
};

export default SocialSearch;
