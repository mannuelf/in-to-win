import React from "react";
import { IMG_URL } from "../constants/constants";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import HeaderCard from "../components/HeaderCard";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("User"));
  const [url] = user.profileimage;
  const username = user.username;
  const firstName = user.Firstname;
  const lastName = user.Lastname;
  const points = user.points;
  const imgUrl = user.profileimage.length ? `${IMG_URL}${url.url}` : false;
  const noImgUrl =
    "https://i7.pngguru.com/preview/117/435/819/user-silhouette-my-account-icon.jpg";
  const profileImgUrl = user.profileimage.length ? imgUrl : noImgUrl;
  return (
    <div>
      <h1>Profile</h1>
      <HeaderCard
        url={profileImgUrl}
        username={username}
        firstName={firstName}
        profileImgUrl={profileImgUrl}
        points={points}
      />
      <div>
        {firstName} {lastName}
      </div>
      <Button
        outline
        wide
        >Edit Profile</Button>
      <div>
        <h2>Tasks Completed</h2>
      </div>
      <TaskCard />
    </div>
  );
}

export default Profile;
