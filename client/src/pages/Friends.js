import React, { useEffect, useState } from "react";

import _ from "lodash";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";

import { getUserFriendsData, removeFriend } from "../services/userService";

import FriendList from "../components/FriendList";
import InputSearch from "../components/InputSearch";
import LeaderboardButton from "../components/common/LeaderboardButton";
import FriendsNavBar from "../components/FriendsNavBar";
import SocialSearch from "./SocialSearch";

const Friends = ({ location }) => {
  const [userFriendsData, setUserFriendsData] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState(null);

  async function getUserService() {
    const userFriendsData = await getUserFriendsData();
    setUserFriendsData(userFriendsData);
  }

  useEffect(() => {
    getUserService();
  }, []);

  const handleUnfollow = async costumerId => {
    const originalFriendsData = userFriendsData;
    const newFriendsData = userFriendsData.filter(
      friend => friend.id != costumerId
    );
    setUserFriendsData(newFriendsData);
    try {
      await removeFriend(costumerId);
      toast.success("Friend succesfully removed.", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (ex) {
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

  const path = "/user/search-for-a-friend";
  return (
    <div style={style_container}>
      <LeaderboardButton />
      <FriendsNavBar />
      <InputSearch
        onChange={handleFriendSearch}
        type="text"
        name={location.pathname === path ? "search-user" : "search-friend"}
        id={location.pathname === path ? "search-user" : "search-friend"}
        placeholder={
          location.pathname === path
            ? "Search a person..."
            : "Search a friend..."
        }
      />
      <Route
        path="/user/friend-list"
        render={props => (
          <FriendList
            friendList={sortedFriendList}
            onUnfollow={handleUnfollow}
            {...props}
          />
        )}
      />

      <Route
        path="/user/social-search"
        render={props => <SocialSearch {...props} />}
      />
    </div>
  );
};

const style_container = {
  padding: "64px 16px 0"
};

export default Friends;
