import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles
import Background from './style/app/background';

// Component
import Weather from './components/weather';

const App = () => {
    const [img, setImg] = useState('');

    const dataBackground = async () => {
        try {
            const data = await axios.get(
                '/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR'
            );
            setImg(data.data.images[0].url);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        dataBackground();
    }, []);

    return (
        <Background img={img}>
            <Weather />
        </Background>
    );
};

export default App;
