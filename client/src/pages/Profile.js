import React from 'react'
import { IMG_URL } from "../constants/constants";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import HeaderCard from "../components/HeaderCard"

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("User"));
  const [url] = user.profileimage;
  const firstName = user.Firstname;
  const lastName = user.Lastname;
  const points = user.points;
  const profileImgUrl = `${IMG_URL}${url.url}`;

  return(
    <div>
      <h1>Profile</h1>
      <HeaderCard
          url={profileImgUrl}
          firstName={firstName}
          profileImgUrl={profileImgUrl}
          points={points}
      />
      <div>{firstName} {lastName}</div>
      <Button primary >Edit Profile</Button>
      <div>
        <h2>Tasks Completed</h2>
      </div>
      <TaskCard />
    </div>
  )
}

export default Profile;
