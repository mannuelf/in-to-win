import React from "react"
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const HeaderCardContainer = styled.div`
  background-color: ${theme.gradient};
  display: flex;
  justify-content: space-between;
`;

const MediaCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const HeaderCardImage = styled.div`

`;

const HeaderCardContent = styled.div`
 padding: .5em;
 padding-left: 1em;
`;

const HeaderCardPoints = styled.div`
 padding: .5em;
 margin-right: 30px;
`;

const coverImg = {
  width: "64px",
  height: "64px",
  "border-radius": "50%"
};

function HeaderCard({username, firstName, profileImgUrl, points}) {
  return(
    <HeaderCardContainer>
      <MediaCardWrapper>
        <div>
          <HeaderCardImage />
          <img style={coverImg} src={profileImgUrl} alt={firstName} />
        </div>
        <HeaderCardContent>
          <div>@{username}</div>
          <div className="header-card-content-subtitle">{points}</div>
        </HeaderCardContent>
      </MediaCardWrapper>
      <HeaderCardPoints>
        <div>Rank: 1000</div>
        <div>🙂</div>
      </HeaderCardPoints>
    </HeaderCardContainer>
  )
}

export default HeaderCard
