import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const Button = styled.button`
  padding: 16px 24px;
  border: 2px solid;
  font-weight: normal;
  font-size: ${() => theme.sizes.small};
  border-radius: 25px;
  border-color: ${({ color }) =>
    color === "orange" ? theme.colors.primary : "blue"};
  background-color: ${({ primary }) => primary && theme.colors.primary};
`;

export default Button;
