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
  flex-grow: 64px;
`;

const HeaderCardContent = styled.div`
 flex-grow: 2;
 padding: .5em;
`;

const HeaderCardPoints = styled.div`
 flex-grow: 2;
 padding: .5em;
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
          <div>@{username}</div>
          <div className="header-card-content-subtitle">{points}</div>
        </HeaderCardContent>
        <HeaderCardPoints>
          <div>Rank: 1000</div>
          <div>🙂</div>
        </HeaderCardPoints>
    </HeaderCardContainer>
  )
}

export default HeaderCard
