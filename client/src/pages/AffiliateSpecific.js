import React, { useState, useEffect } from "react";

import { BASE_URL, AFFILIATES_URL, IMG_URL } from "../constants/constants";
import axios from "axios";

function AffiliateSpecific(props) {
  const [affiliate, setAffiliate] = useState(undefined);
  useEffect(() => {
    console.log();
    axios
      .get(`${BASE_URL}${AFFILIATES_URL}/${props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        setAffiliate(response.data);
      });
  }, []);
  return (
    <div className="App">
      <h1>Affiliates</h1>
      {affiliate !== undefined ? (
        <>
          <h1>{affiliate.name}</h1>
          <img src={IMG_URL + affiliate.logo.url} alt={affiliate.name} />
          <iframe
            width="100%"
            height="315"
            src={affiliate.videolink}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>{affiliate.description}</p>
          <p>{affiliate.websiteurl}</p>
        </>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

export default AffiliateSpecific;
