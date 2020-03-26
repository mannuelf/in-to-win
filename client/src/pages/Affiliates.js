import React, { useState, useEffect } from "react";

import { BASE_URL, AFFILIATES_URL, IMG_URL } from "../constants/constants";
import axios from "axios";

import AffiliateCard from "./../components/affiliateCard";

function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);
  useEffect(() => {
    axios.get(BASE_URL + AFFILIATES_URL).then(response => {
      console.log(response.data);
      setAffiliates(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Affiliates</h1>
      {affiliates.map((value, index) => {
        return (
          <AffiliateCard
            key={index}
            name={value.name}
            description={value.description}
            logo={IMG_URL + value.logo.url}
          />
        );
      })}
    </div>
  );
}

export default Affiliates;