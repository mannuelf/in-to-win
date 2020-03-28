import http from "./httpService";
import { BASE_URL, USERS, CUSTOMER_FRIENDS } from "../constants/constants";

export function getAllCostumersData() {
  return http.get(BASE_URL + USERS);
}

export function getUserData() {
  return JSON.parse(sessionStorage.getItem("User"));
}

export function getAllCostumersFriendList() {
  return http.get(BASE_URL + CUSTOMER_FRIENDS);
}

export async function getUserFriendList() {
  const { data: costumersData } = await getAllCostumersData();
  const { data: costumersFriendList } = await getAllCostumersFriendList();

  const userFriendList = costumersFriendList.filter(costumerFriendList =>
    costumersData.filter(
      costumersData => costumersData.id === costumerFriendList.userNumber
    )
  );

  return userFriendList;
}

export async function getUserFriendsData() {
  const { data: costumersData } = await getAllCostumersData();
  const userFriendList = await getUserFriendList();
  console.log({ userFriendList });

  function findFriend() {
    return userFriendList.filter(userFriend => userFriend.friendNumber);
  }

  const userFriendsData = [costumersData.find(findFriend)];

  return userFriendsData;
}
