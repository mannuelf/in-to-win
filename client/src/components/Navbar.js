import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";
import FriendsIcon from "../assets/icons/svg/people-outline.svg";
import DailiesIcon from "../assets/icons/svg/calendar-outline.svg";
import RewardsIcon from "../assets/icons/svg/credit-card-outline.svg";
import ProfileIcon from "../assets/icons/svg/person-outline.svg";
export const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.text};
  font-size: 1.6rem;
  text-decoration: none;
  &.active {
    color: ${theme.colors.primary};
    fill: ${theme.colors.primary};
  }
`;
const MarginTop = styled.div`
  margin: 0;
  margin-top: 8rem;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;
const NavWrapper = styled.nav`
  padding: 1.6rem 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 8rem;
  position: fixed;
  width: 100%;
  height: 8rem;
  bottom: 0;
  background: ${theme.colors.bg};
  box-shadow: ${theme.shadowUp};
`;
const Navbar = () => {
  return (
    <>
      <MarginTop />
      <NavWrapper>
        <StyledLink exact to="/">
          <StyledIcon src={DailiesIcon} />
          Dailies
        </StyledLink>
        <StyledLink to="/user/friend-list">
          <StyledIcon src={FriendsIcon} />
          Friends
        </StyledLink>
        <StyledLink to="/affiliates">
          <StyledIcon src={RewardsIcon} />
          Affiliates
        </StyledLink>
        <StyledLink to="/profile">
          <StyledIcon src={ProfileIcon} />
          Profile
        </StyledLink>
      </NavWrapper>
    </>
  );
};

export default Navbar;
