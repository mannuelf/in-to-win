import React, { useState } from "react";
import styled from "styled-components";
import theme from "../GlobalStyle/Theme";
import Button from "../components/Button";
import AlertIcon from "../assets/icons/svg/alert-circle-outline.svg";

const StyledWrapper = styled.div`
  padding: 1.6rem;
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 8rem;
  background: ${theme.colors.dark};
`;

const StyledTitle = styled.h3`
  display: inline-block;
  margin: 0;
  font-size: 2.4rem;
  font-weight: 500;
`;

const StyledParagraph = styled.p`
  margin: 1.6rem 0;
  font-size: 1.6rem;
  font-weight: 400;
`;

const StyledButton = styled(Button)`
  margin-left: 1.6rem;
`;

const StyledIcon = styled.img`
  margin-right: 1.6rem;
  width: 24px;
  height: 24px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => `flex-${align}`};
`;

const Toast = ({
  title = "Warning",
  text = "This is a warning, blah blah blah...",
  canCancel = false,
  onAccept
}) => {
  const [open, setOpen] = useState(true);

  const handleCloseToast = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <StyledWrapper>
          <StyledRow align="start">
            <StyledIcon src={AlertIcon} />
            <StyledTitle>{title}</StyledTitle>
          </StyledRow>
          <StyledParagraph>{text}</StyledParagraph>
          <StyledRow align="end">
            {canCancel && (
              <StyledButton onClick={handleCloseToast} outline>
                Cancel
              </StyledButton>
            )}
            <StyledButton onClick={onAccept || handleCloseToast} primary>
              OK
            </StyledButton>
          </StyledRow>
        </StyledWrapper>
      )}
    </>
  );
};

export default Toast;
