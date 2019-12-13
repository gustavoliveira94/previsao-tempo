import styled from 'styled-components';

const Weather = styled.div`
    width: 500px;
    max-width: 500px;
    height: 500px;

    @media (max-width: 540px) {
        width: 100%;
        margin: 0 5%;
    }
`;

export default Weather;
