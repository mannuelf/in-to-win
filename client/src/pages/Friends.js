import React, { useEffect, useState } from "react";

import _ from "lodash";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";

import {
  getUserFriendsData,
  removeFriend,
  getUserData,
  getAllCostumersData,
  addFriend
} from "../services/userService";

import FriendList from "../components/FriendList";
import InputSearch from "../components/InputSearch";
import LeaderboardButton from "../components/common/LeaderboardButton";
import FriendsNavBar from "../components/FriendsNavBar";
import SocialSearch from "./SocialSearch";

const Friends = ({ location }) => {
  const [userFriendsData, setUserFriendsData] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState(null);
  const [costumersData, setCostumersData] = useState([]);
  const [currentUserData] = useState(getUserData());
  const [searchValue, setSearchValue] = useState("" && undefined);
  const [filteredUsersToFollow, setFilteredUsersToFollow] = useState([]);

  const filteredCostumersData = costumersData.filter(
    data => data.id !== currentUserData.id
  );
  const userFriendsId = userFriendsData.map(value => value.id);
  const usersToFollow = filteredCostumersData.filter(
    fcd => !userFriendsId.includes(fcd.id)
  );
  const unfollowedUsers = filteredUsersToFollow.length
    ? filteredUsersToFollow
    : usersToFollow;

  const followedUsers = filteredFriends ? filteredFriends : userFriendsData;
  const sortedFollowedUsers = _.orderBy(
    followedUsers,
    ["id", "name"],
    ["desc", "asc"]
  );
  const sortedUnfollowedUsers = _.orderBy(
    unfollowedUsers,
    ["id", "name"],
    ["desc", "asc"]
  );

  async function getUserService() {
    const userFriendsData = await getUserFriendsData();
    setUserFriendsData(userFriendsData);
    const { data: costumersData } = await getAllCostumersData();
    setCostumersData(costumersData);
  }
  useEffect(() => {
    getUserService();
  }, []);

  const handleUnfollow = async costumerId => {
    const originalFriendsData = userFriendsData;
    const originalUsersToFollow = usersToFollow;
    const userUnfollowedData = costumersData.filter(
      costumer => costumer.id === costumerId
    );

    try {
      const newUsersToFollow = [...usersToFollow, ...userUnfollowedData];
      setFilteredUsersToFollow(newUsersToFollow);
      const newFriendsData = userFriendsData.filter(
        friend => friend.id != costumerId
      );
      setUserFriendsData(newFriendsData);
      await removeFriend(costumerId);
      toast.info(`You have unfollowed ${userUnfollowedData[0].username}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (ex) {
      toast.error(`Error unfollowing ${userUnfollowedData[0].username}`, {
        position: toast.POSITION.TOP_CENTER
      });
      setUserFriendsData(originalFriendsData);
      setFilteredUsersToFollow(originalUsersToFollow);
    }
  };

  const handleFollow = async userFollowedId => {
    const originalFriendsData = userFriendsData;
    const originalUsersToFollow = usersToFollow;
    const userFollowedData = costumersData.filter(
      costumer => costumer.id === userFollowedId
    );

    try {
      const newUsersToFollow = usersToFollow.filter(
        user => user.id !== userFollowedId
      );
      const newFriendsData = [...userFriendsData, ...userFollowedData];
      setUserFriendsData(newFriendsData);
      setFilteredUsersToFollow(newUsersToFollow);
      toast.info(`You started to follow ${userFollowedData[0].username}`);
      await addFriend(userFollowedId);
    } catch (error) {
      toast.error(`Failed to follow ${userFollowedData[0].username}`);
      setUserFriendsData(originalFriendsData);
      setFilteredUsersToFollow(originalUsersToFollow);
    }
  };

  const handleFriendSearch = e => {
    const searchvalue = e.currentTarget.value.toLowerCase();
    setSearchValue(searchvalue);
    const userFriends = userFriendsData;
    const filteredFriends = userFriends.filter(value =>
      value.username.toLowerCase().includes(searchvalue)
    );

    setFilteredFriends(filteredFriends);
  };

  const handleSocialSearch = e => {
    const searchvalue = e.currentTarget.value.toLowerCase();
    setSearchValue(searchvalue);
    const filteredUsersToFollow = usersToFollow.filter(value =>
      value.username.toLowerCase().includes(searchvalue)
    );

    setFilteredUsersToFollow(filteredUsersToFollow);
  };

  const resetSearchInput = () => {
    setSearchValue("");
    setFilteredFriends(null);
  };

  const path = "/user/social-search";

  return (
    <div style={style_container}>
      <LeaderboardButton />
      <FriendsNavBar onClick={resetSearchInput} />
      <InputSearch
        onChange={
          location.pathname === path ? handleSocialSearch : handleFriendSearch
        }
        type="text"
        name={location.pathname === path ? "search-user" : "search-friend"}
        id={location.pathname === path ? "search-user" : "search-friend"}
        placeholder={
          location.pathname === path
            ? "Search a person..."
            : "Search a friend..."
        }
        value={searchValue}
      />
      <Route
        path="/user/friend-list"
        render={props => (
          <FriendList
            followedUsers={sortedFollowedUsers}
            onUnfollow={handleUnfollow}
            {...props}
          />
        )}
      />

      <Route
        path="/user/social-search"
        render={props => (
          <SocialSearch
            unfollowedUsers={sortedUnfollowedUsers}
            onFollow={handleFollow}
            {...props}
          />
        )}
      />
    </div>
  );
};

const style_container = {
  padding: "64px 16px 0"
};

export default Friends;
