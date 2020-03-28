import React from "react";
import { Link } from "react-router-dom";

function AffiliatesCard({ name, description, logo, id }) {
  return (
    <div className="card">
      <h1>{name}</h1>
      <img src={logo} alt={name} />
      <p>{description}</p>
      <Link to={`affiliateSpecific/${id}`}></Link>
    </div>
  );
}

export default AffiliatesCard;
