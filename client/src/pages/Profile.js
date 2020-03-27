import React from 'react'
import { IMG_URL } from "../constants/constants";
import Button from "../components/Button";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("User"));
  const [profileImage] = user.profileimage;
  const profileUrl = `${IMG_URL}${profileImage.url}`;
  return(
    <div>
      <h1>Profile</h1>
      <figure>
        <img src={profileUrl} alt={user.Firstname} />
      </figure>
      <div>{user.Firstname} {user.Lastname}</div>
      <Button primary >Edit Profile</Button>
      <div>
        <h2>Tasks Completed</h2>
      </div>
    </div>
  )
}

export default Profile;
