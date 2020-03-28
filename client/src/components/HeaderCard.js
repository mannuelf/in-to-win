import React from "react"
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const HeaderCardContainer = styled.div`
  background-color: ${theme.gradient};
`;

const HeaderCardImage = styled.div`
  width: 100%;
`;

const coverImg = {
  width: "100%"
};

function HeaderCard({username, firstName, profileImgUrl, points}) {
  return(
    <HeaderCardContainer>
      <div className="header-card-media">
        <div className="header-card-media-left">
          <HeaderCardImage />
          <figure className="header-card-image">
            <img style={coverImg} src={profileImgUrl} alt={firstName} />
          </figure>
        </div>
        <div className="header-card-media-content">
          <p className="header-card-content-title">@{username}</p>
          <p className="header-card-content-subtitle">{points}</p>
        </div>
      </div>
    </HeaderCardContainer>
  )
}

export default HeaderCard
