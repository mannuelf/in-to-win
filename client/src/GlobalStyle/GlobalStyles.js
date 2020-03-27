import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Work+Sans:400,500&display=swap');

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

}

a,button, body {
  font-family: 'Work Sans', sans-serif;
}




`;

export default GlobalStyle;
