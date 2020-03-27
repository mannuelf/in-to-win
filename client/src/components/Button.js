import styled from "styled-components";
import theme from "../GlobalStyle/Theme";

const Button = styled.button`
  padding: 16px 24px;
  border: 2px solid;
  border-color: ${({ color }) =>
    color === "orange" ? theme.colors.primary : "blue"};
`;

export default Button;
