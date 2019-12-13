import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Poppins', sans-serif;
    }

    html, body, #root {
        width: 100%;
        height: 100vh;
        min-height: 100vh;
        overflow: hidden;
    }
`;

export default Global;
