import React, { useState, useEffect } from 'react';

// Styles
import Background from './style/app/background';

// Component
import Weather from './components/weather';

// Api Unsplash
import { unsplash } from './utils/api-image';

const App = () => {
    const [img, setImg] = useState('');

    const dataBackground = async () => {
        unsplash.photos
            .getRandomPhoto({ query: 'weather', featured: true })
            .then(response => {
                response.json().then(data => {
                    setImg(data.urls.full);
                });
            })
            .catch(err => {
                console.log(err);
            });
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
