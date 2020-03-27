import { createGlobalStyle } from "styled-components";
import theme from "./Theme";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

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
}

a,button, body {
  font-family: 'Roboto', sans-serif;
}




`;

export default GlobalStyle;
