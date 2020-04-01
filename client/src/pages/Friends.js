import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  getUserFriendsData,
  getUserData,
  getUserFriendList,
  removeFriend
} from "../services/userService";
import { IMG_URL } from "../constants/constants";
import http from "../services/userService";
import FollowFriendCard from "../components/FollowFriendCard";
import { Link } from "react-router-dom";
import theme from "../GlobalStyle/Theme";

const Friends = () => {
  const [userData, setUserData] = useState(null);
  const [userFriendsData, setUserFriendsData] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState(null);
  const [userFriendList, setUserFriendList] = useState([]);

  async function getUserService() {
    const userFriendsData = await getUserFriendsData();
    setUserFriendsData(userFriendsData);
    const userFriendList = await getUserFriendList();
    setUserFriendList(userFriendList);
  }

  console.log({ userFriendList });

  useEffect(() => {
    setUserData(getUserData);
    getUserService();
  }, []);

  const handleUnfollow = async costumerId => {
    const originalFriendsData = userFriendsData;
    try {
      const newFriendsData = userFriendsData.filter(
        friend => friend.id != costumerId
      );
      setUserFriendsData(newFriendsData);
      await removeFriend(costumerId);
      toast.success("Friend succesfully removed.", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (ex) {
      console.log(ex.response);
      toast.error("Friend has already been removed.", {
        position: toast.POSITION.TOP_CENTER
      });
      setUserFriendsData(originalFriendsData);
    }
  };

  const handleFriendSearch = e => {
    const search = e.currentTarget.value.toLowerCase();
    const userFriends = userFriendsData;
    const filteredFriends = userFriends.filter(value =>
      value.username.toLowerCase().includes(search)
    );

    setFilteredFriends(filteredFriends);
  };

  const friendList = filteredFriends ? filteredFriends : userFriendsData;
  const sortedFriendList = _.orderBy(
    friendList,
    ["id", "name"],
    ["desc", "asc"]
  );
  return (
    <div>
      <Link to="/leaderboard" style={style_containerLeaderboardBtn}>
        <button style={style_leaderboardBtn}>Leaderboard</button>
      </Link>
      <h1>Friends</h1>
      <form>
        <input
          onChange={handleFriendSearch}
          tpye="text"
          name="search-friends"
          id="search-friends"
        />
      </form>
      {sortedFriendList.length ? (
        sortedFriendList.map(
          ({ profileimage, username, points, id }, index) => {
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
                onUnfollow={handleUnfollow}
                isFollowing={true}
              />
            );
          }
        )
      ) : (
        <h3>You ain't got no friends homie.</h3>
      )}
    </div>
  );
};

const style_containerLeaderboardBtn = {
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

export default Friends;
