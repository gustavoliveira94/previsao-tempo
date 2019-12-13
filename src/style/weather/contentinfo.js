import styled from 'styled-components';

const ContentInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    color: #fff;
    margin: 15px 0 30px;

    h3 {
        width: 100%;
        text-align: left;
        margin-bottom: 5px;
    }

    p {
        width: 100%;
        text-align: left;
    }

    button {
        width: 100%;
        border: 0;
        color: #fff;
        background-color: transparent;
        text-align: left;
        font-size: 16px;
        cursor: pointer;
    }

    @media (max-width: 540px) {
        h3 {
            font-size: 16px;
        }
        p {
            font-size: 14px;
        }
        button {
            font-size: 14px;
        }
    }
`;

export default ContentInfo;
