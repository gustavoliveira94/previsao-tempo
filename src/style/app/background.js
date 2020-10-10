import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url('${props => props.img}');
    background-size: cover;
    background-position: center;
`;

export default Background;
