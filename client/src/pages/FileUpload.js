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
    // create form data from the form to setup the form data
    // the file upload field must be named "files.<strapi-field-name>" (see the form file element name)
    // we can then add extra column data to be saved via the 'data' json object
    const formData = new FormData(e.target);
    formData.append("data", JSON.stringify({
      // example of saving other field values
      Filepictureimageid: "2",
    }))
    //formData.append("filepictureimage", userImage);
    console.log("form elem:", e.target);
    console.log("formData:", formData);
    //console.log(formData.getAll("pictureid"));
    //console.log(formData.getAll("usertaskimages"));
    axios
      .post(
        BASE_URL + TASK_IMAGES,
        formData
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
        <input type="file" name="files.filepictureimage" onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
}


// https://stackoverflow.com/a/1186309
function objectifyForm(formArray) {//serialize data function
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

export default TaskFileUploader;
