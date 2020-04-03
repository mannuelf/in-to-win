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
  const userData = getUserData();
  const { data: costumersData } = await getAllCostumersData();
  const { data: costumersFriendList } = await getAllCostumersFriendList();
  const userFriendlist = costumersFriendList.filter(
    cfl => cfl.userNumber === userData.id.toString()
  );

  return userFriendlist;
}

export async function getUserFriendsData() {
  const { data: costumersData } = await getAllCostumersData();
  const userFriendList = await getUserFriendList();
  const userFriendListId = userFriendList.map(ufl => ufl.friendNumber);
  console.log({ userFriendList });
  const userFriendsData = costumersData.filter(item =>
    userFriendListId.includes(item.id.toString())
  );

  return userFriendsData;
}

export async function removeFriend(friendNumber) {
  const userFriendList = await getUserFriendList();

  const result = userFriendList.filter(
    item => item.friendNumber === friendNumber.toString()
  );
  const friendArrayId = result[0].id;

  return http.delete(BASE_URL + CUSTOMER_FRIENDS + "/" + friendArrayId);
}

export function addFriend(userFollowedId) {
  const { id } = getUserData();
  return http.post(BASE_URL + CUSTOMER_FRIENDS, {
    friendNumber: userFollowedId.toString(),
    userNumber: id.toString()
  });
}
