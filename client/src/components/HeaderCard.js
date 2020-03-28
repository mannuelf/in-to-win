import React from "react"
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const HeaderCardContainer = styled.div`
  background-color: ${theme.gradient};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const HeaderCardImage = styled.div`
  width: 100%;
`;

const HeaderCardMedia = styled.div`
  flex-grow: 1;
`;

const HeaderCardContent = styled.div`
 flex-grow: 2;
`;

const coverImg = {
  width: "64px",
  height: "64px",
  "border-radius": "50%"
};

function HeaderCard({username, firstName, profileImgUrl, points}) {
  return(
    <HeaderCardContainer>
        <HeaderCardMedia>
          <HeaderCardImage />
          <img style={coverImg} src={profileImgUrl} alt={firstName} />
        </HeaderCardMedia>
        <HeaderCardContent>
          <p className="header-card-content-title">@{username}</p>
          <p className="header-card-content-subtitle">{points}</p>
        </HeaderCardContent>
    </HeaderCardContainer>
  )
}

export default HeaderCard
