import React from "react";

import axios from "axios";

function AffiliatesCard({ name, description, logo }) {
  return (
    <div className="card">
      <h1>{name}</h1>
      <img src={logo} alt={name} />
      <p>{description}</p>
    </div>
  );
}

export default AffiliatesCard;
