import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url('${props => props.img}');
`;

export default Background;
