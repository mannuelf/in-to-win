import React from "react"

function HeaderCard({firstName, profileImgUrl, points}) {
  console.log(profileImgUrl);
  return(
    <div className="header-card-content">
      <div className="header-card-media">
        <div className="header-card-media-left">
          <figure className="header-card-image">
            <img src={profileImgUrl} alt={firstName} />
          </figure>
        </div>
        <div className="header-card-media-content">
          <p className="header-card-content-title">{firstName}</p>
          <p className="header-card-content-subtitle">{points}</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderCard
