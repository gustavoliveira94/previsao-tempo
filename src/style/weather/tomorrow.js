/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

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
    background-color: ${props =>
        props.color >= 15 && props.color <= 35
            ? '#fccd05'
            : props.color < 15
            ? '#0060D1'
            : '#D72E11'};
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
