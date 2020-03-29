import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const Button = styled.button`
  text-decoration: none;
  margin-top: 1.6rem;
  padding-left: 24px;
  padding-right: 24px;
  border: ${({ outline }) => (outline ? "2px solid" : "none")};
  height: 52px;
  width: ${({ wide }) => (wide ? "100%" : "auto")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ outline }) =>
    outline ? theme.colors.primary : theme.colors.dark};
  font-weight: 400;
  font-size: ${() => theme.sizes.small};
  border-radius: 25px;
  border-color: ${theme.colors.primary};
  background: ${({ primary }) => (primary ? theme.colors.primary : "none")};
  cursor: pointer;
  transition-property: background, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  :hover,
  :active,
  :focus {
    opacity: 0.9;
    background: ${() => theme.colors.primary};
    color: ${() => theme.colors.dark};
  }

  :disabled {
    background: ${({ outline }) => (outline ? "none" : theme.colors.text)};
    border-color: ${({ outline }) => (outline ? theme.colors.text : "none")};
    color: ${({ outline }) =>
      outline ? theme.colors.text : theme.colors.dark};
    opacity: 0.6;
  }
`;

export default Button;
