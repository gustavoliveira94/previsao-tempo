/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';

const colors = css`
    background-color: ${props =>
        props.celsius
            ? props.color >= 15 && props.color <= 35
                ? 'rgba(252, 205, 5, 0.8)'
                : props.color < 15
                ? 'rgba(0, 96, 209, 0.8)'
                : 'rgba(215, 46, 17, 0.8)'
            : 1.8 * props.color + 32 >= 15 && 1.8 * props.color + 32 <= 35
            ? 'rgba(252, 205, 5, 0.8)'
            : 1.8 * props.color + 32 < 15
            ? 'rgba(0, 96, 209, 0.8)'
            : 'rgba(215, 46, 17, 0.8)'};
`;

const Content = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    ${colors};
`;

export default Content;
