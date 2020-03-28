import React, { useState, useEffect } from "react";
import AffiliateCard from "../components/affiliateCard";

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
  console.log(affiliate);
  return (
    <div className="App">
      <h1>Affiliates</h1>
      {affiliate !== undefined ? (
        <AffiliateCard
          name={affiliate.name && affiliate.name}
          logo={affiliate.logo.url && IMG_URL + affiliate.logo.url}
          videolink={affiliate.videolink && affiliate.videolink}
          id={affiliate.id}
          btnText="Go to website"
          description={affiliate.description}
          btnLink={affiliate.websiteurl}
        />
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

export default AffiliateSpecific;
