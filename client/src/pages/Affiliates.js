import React, { useState, useEffect } from "react";

import { BASE_URL, AFFILIATES_URL, IMG_URL } from "../constants/constants";
import axios from "axios";

import AffiliateCard from "./../components/affiliateCard";

function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);
  useEffect(() => {
    axios.get(BASE_URL + AFFILIATES_URL).then(response => {
      setAffiliates(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1 style={style_h1}>Affiliates</h1>
      {affiliates.map((value, index) => {
        return (
          <AffiliateCard
            withButton
            key={index}
            id={value.id}
            name={value.name}
            description={value.description}
            logo={IMG_URL + value.logo.url}
          />
        );
      })}
    </div>
  );
}

const style_h1 = {
  textAlign: "center"
}

export default Affiliates;
