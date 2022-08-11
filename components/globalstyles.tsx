import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: #3d515b;
    padding: 0;
    margin: 0;
    height: 100%;

    > div {
      height: 100%;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, button {
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
`;

export default GlobalStyle;
