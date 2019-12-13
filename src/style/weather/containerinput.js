import styled from 'styled-components';

const ContainerInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #eee;
    border: 0;
    padding: 0 0 0 10px;

    img {
        width: 30px;
        height: 30px;
    }

    input {
        width: 90%;
        height: 100%;
        background-color: transparent;
        border: 0;
        padding: 0 10px;
        font-size: 18px;
        font-weight: bold;
    }

    button {
        cursor: pointer;
        height: 100%;
        border: 0;
        padding: 0 10px;
        font-weight: bold;
    }
`;

export default ContainerInput;
