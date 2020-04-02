import React from "react";
import { IMG_URL } from "../constants/constants";
import FollowFriendCard from "../components/FollowFriendCard";

function FriendList({ friendList, onUnfollow }) {
  return (
    <div style={style_container}>
      {friendList.length ? (
        friendList.map(({ profileimage, username, points, id }, index) => {
          let img;
          profileimage.length > 0
            ? (img = IMG_URL + profileimage[0].url)
            : (img =
                "https://i7.pngguru.com/preview/117/435/819/user-silhouette-my-account-icon.jpg");
          return (
            <FollowFriendCard
              key={index}
              image={img}
              username={username}
              id={id}
              label={"Score"}
              score={points}
              onUnfollow={onUnfollow}
              isFollowing={true}
            />
          );
        })
      ) : (
        <h3>You ain't got no friends homie.</h3>
      )}
    </div>
  );
}

const style_container = {
  marginTop: "32px"
};

export default FriendList;
