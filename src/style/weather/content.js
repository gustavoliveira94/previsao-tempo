/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const Content = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 45px);
    background-color: ${props =>
        props.color >= 15 && props.color <= 35
            ? 'rgba(252, 205, 5, 0.8)'
            : props.color < 15
            ? 'rgba(0, 96, 209, 0.8)'
            : 'rgba(215, 46, 17, 0.8)'};
    background-color: ${props => props.color};
`;

export default Content;
