import React from "react";
import theme from "../GlobalStyle/Theme";

function InputSearch({ ...rest }) {
  return (
    <div>
      <input {...rest} style={style_searchInput} />
    </div>
  );
}
const style_searchInput = {
  width: "100%",
  padding: "8px 0",
  fontSize: "16px",
  color: `${theme.colors.text}`,
  backgroundColor: "transparent",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: `2pt solid ${theme.colors.primary}`
};

export default InputSearch;
