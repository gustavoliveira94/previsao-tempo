import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GetWeather = ({ city, initCity }) => {
    const [weather, setWeather] = useState([]);

    // Get Weather
    const getWeather = useCallback(async () => {
        try {
            const data = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${initCity ||
                    city}&APPID=7ba73e0eb8efe773ed08bfd0627f07b8`
            );

            setWeather(data.data);
        } catch (e) {
            setWeather('Nenhum local encontrado!');
            console.log(e);
        }
    }, [city, initCity]);

    useEffect(() => {
        if (initCity || city) {
            getWeather();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, initCity]);

    return weather;
};

export default GetWeather;
