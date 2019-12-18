/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';

const colors = css`
    background-color: ${props =>
        props.celsius
            ? props.color >= 15 && props.color <= 35
                ? '#fccd05'
                : props.color < 15
                ? '#0060D1'
                : '#D72E11'
            : 1.8 * props.color + 32 >= 15 && 1.8 * props.color + 32 <= 35
            ? '#fccd05'
            : 1.8 * props.color + 32 < 15
            ? '#0060D1'
            : '#D72E11'};
`;

const Tomorrow = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: ${props => (props.tomorrow ? '70px' : '0')};
    ${colors};
    color: #fff;

    div {
        width: 40%;

        button {
            cursor: pointer;
            border: 0;
            color: #fff;
            background-color: transparent;
            font-size: 16px;
        }
    }

    @media (max-width: 540px) {
        div {
            width: 50%;
            h3 {
                font-size: 16px;
            }
            button {
                font-size: 14px;
            }
        }
    }
`;

export default Tomorrow;
