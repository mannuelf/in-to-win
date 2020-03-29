import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const StyledWrapper = styled.div`
  margin: 1.6rem;
  padding: 1.6rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background: ${theme.gradient};
  box-shadow: ${theme.shadow};
`;

const StyledTitle = styled.h2`
  margin: 0;
  margin-bottom: 1.6rem;
  font-size: 2.4rem;
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
`;

const AlignedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => `flex-${align}`};
`;

const StyledLogo = styled.img`
  width: 100%;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 350px;
  margin: 1.6rem 0;
  border: none;
  border-radius: 1.6rem;
`;

const AffiliatesCard = ({
  name = "Unknown brand",
  description,
  logo,
  id,
  videolink,
  btnText = "View more",
  btnLink
}) => {
  return (
    <StyledWrapper>
      <StyledTitle>{name}</StyledTitle>
      {logo && <StyledLogo src={logo} alt={name} />}
      {videolink && (
        <StyledIframe
          src={videolink}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></StyledIframe>
      )}
      <StyledParagraph>{description}</StyledParagraph>
      <AlignedDiv align="end">
        <Button as={Link} outline to={btnLink || `affiliateSpecific/${id}`}>
          {btnText}
        </Button>
      </AlignedDiv>
    </StyledWrapper>
  );
};

export default AffiliatesCard;
