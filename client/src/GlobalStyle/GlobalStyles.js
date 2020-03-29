import { createGlobalStyle } from "styled-components";
import theme from "./Theme";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: ${theme.colors.bg};
  color: ${theme.colors.text}
}

a,button, body {
  font-family: 'Roboto', sans-serif;
}

.App {
  overflow: hidden;
}

a.active img {
  filter: invert(1) brightness(0.6) sepia(1) hue-rotate(0deg) saturate(3);
}

`;

export default GlobalStyle;
