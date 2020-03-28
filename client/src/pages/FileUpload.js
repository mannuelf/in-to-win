import React, { useState, useEffect } from "react";

import axios from "axios";
import { BASE_URL, TASK_IMAGES } from "./../constants/constants";

function TaskFileUploader() {
  const [userid, setUserid] = useState([]);
  const [userImage, setUserImage] = useState({});
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("User"));
    setUserid(user.id);
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log("userid", userid);
    console.log("image", userImage);
    const formData = new FormData();
    formData.append("filepictureimage", userImage);

    console.log(formData.getAll("pictureid"));
    console.log(formData.getAll("usertaskimages"));
    axios
      .post(
        BASE_URL + TASK_IMAGES,
        { filepictureimageid: userid.toString(), filepictureimage: userImage },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log("File Post", response);
      });
  };

  const handleChange = input => {
    setUserImage(input.target.files[0]);
  };

  return (
    <div>
      <h3>Upload images for your task</h3>
      <form onSubmit={handleSubmit} id="form">
        <input type="hidden" name="id" value={userid} />
        <input type="file" name="fileupload" onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default TaskFileUploader;
