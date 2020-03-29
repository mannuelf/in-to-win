import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import theme from "../GlobalStyle/Theme";
import Button from "../components/Button";
import ArrowSvg from "../assets/icons/svg/arrow-ios-downward-outline.svg";
import { CUSTOMER_TASK_STATUS } from "../constants/constants";

const slideOut = keyframes`
0% {
 opacity: 0;
 transform: translateY(-100%);
};

100% {

 opacity: 1;
 transform: translateY(-15px);
}
`;

const CardWrapper = styled.div`
  margin: 1.6rem 0;
  width: 350px;
`;
const StyledWrapper = styled.div`
  padding: 1.6rem;
  box-shadow: ${theme.shadow};
  border: ${({ active }) => (active ? "2px solid" : "none")};
  border-color: ${theme.colors.primary};
  position: relative;
  z-index: 10;
  border-radius: 1.5rem;
  color: ${theme.colors.text};
  background: ${({ open }) => (open ? theme.colors.grey : theme.gradient)};
`;

const StyledDescription = styled(StyledWrapper)`
  border-radius: 0 0 1.5rem 1.5rem;
  z-index: 9;
  opacity: ${({ open }) => (open ? "1" : "0")};
  animation: ${slideOut} 0.3s ease forwards;
`;

const StyledTitle = styled.h2`
  font-size: ${theme.sizes.small};
  font-weight: 500;
`;

const StyledParagraph = styled.p`
  font-size: ${theme.sizes.small};
  font-weight: 400;
  color: ${theme.colors.text};
  opacity: ${({ faded }) => faded && 0.7};
`;
const StyledSpan = styled.span`
  color: ${({ primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
`;

const StyledDiv = styled.div`
  margin-top: 2.4rem;
`;

const StyledAvatar = styled.div`
  display: inline-block;
  margin-right: 1.6rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-image: url(${({ imgSrc }) => imgSrc});
`;

const StyledAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ spaced }) => (spaced ? "space-between" : "flex-start")};
`;

const StyledArrow = styled.img`
  width: 24px;
  height: 24px;
  fill: white;
  stroke: white;
  transform: ${({ open }) => (open ? "rotateX(180deg)" : "none")};
`;

const TaskCard = ({
  id = -1,
  title = "Unknown task",
  difficulty = "Easy",
  avatarSrc = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  author = "Bon Jovi",
  description = "This is a task for you, do it and earn points",
  // state
  isOpen = false,
  status,
  // API
  customerTaskId = -1,
  handleAccepted = () => { },
  handleFinished = () => { },
  handleCancel = () => { },
}) => {
  const [open, setOpen] = useState(isOpen);
  const [active, setActive] = useState(status === CUSTOMER_TASK_STATUS.Started);
  const [finished, setFinished] = useState(status === CUSTOMER_TASK_STATUS.Complete);
  const handleOpenCard = () => {
    setOpen(!open);
  };

  const handleFinishTask = () => {
    setFinished(true);
    handleFinished(customerTaskId);
  };
  const handleAcceptedClicked = () => {
    setActive(true);
    handleAccepted(id);
  }
  const handleCancelClicked = () => {
    setActive(false);
    handleCancel(customerTaskId);
  }
  return (
    <CardWrapper>
      <StyledWrapper active={active} open={open} onClick={handleOpenCard}>
        <StyledTitle>{title}</StyledTitle>
        <StyledParagraph>
          Level: <StyledSpan primary>{difficulty}</StyledSpan>
        </StyledParagraph>
        <StyledDiv>
          <StyledAuthor spaced>
            <StyledAuthor>
              <StyledAvatar imgSrc={avatarSrc} />
              <StyledSpan>{author}</StyledSpan>
            </StyledAuthor>
            <StyledArrow open={open} src={ArrowSvg} alt="Open task" />
          </StyledAuthor>
        </StyledDiv>
      </StyledWrapper>
      {open && (
        <StyledDescription open={open} onClick={handleOpenCard}>
          <StyledParagraph>{description}</StyledParagraph>

          {active ? (
            <>
              <Button primary wide onClick={handleFinishTask}>
                Mark as finished
              </Button>
              <Button outline wide onClick={handleCancelClicked}>
                Cancel task
              </Button>
            </>
          ) : (
            <Button primary wide onClick={handleAcceptedClicked}>
              Accept task
            </Button>
          )}
        </StyledDescription>
      )}
    </CardWrapper>
  );
};

export default TaskCard;
