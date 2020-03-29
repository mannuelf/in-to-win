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
    const formData = new FormData(e.target);
    formData.append(
      "data",
      JSON.stringify({
        filepictureimageid: userid.toString()
      })
    );
    axios.post(BASE_URL + TASK_IMAGES, formData).then(response => {
      console.log("File Post", response.data);
    });
  };

  const handleChange = input => {
    setUserImage(input.target.files[0]);
  };

  return (
    <div>
      <h3>Pictures, or we wont believe it!</h3>
      <form onSubmit={handleSubmit} id="form">
        <input type="hidden" name="id" value={userid} />
        <input
          type="file"
          name="files.filepictureimage"
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default TaskFileUploader;
