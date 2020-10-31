import { css } from "@emotion/core";

const GlobalStyles = css`
  html {
    font-family: "Noto Sans KR", "Malgun Gothic", sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  code {
    font-family: "Nanum Gothic Coding", source-code-pro, Menlo, Monaco, Consolas,
      "Courier New", monospace;
  }
  input,
  button,
  textarea {
    font-family: inherit;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

export default GlobalStyles;
