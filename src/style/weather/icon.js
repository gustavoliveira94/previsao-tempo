import styled from 'styled-components';

const Icon = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 60%;
    height: 100%;

    img {
        margin-top: 50px;
    }

    @media (max-width: 540px) {
        width: 50%;
    }
`;

export default Icon;
