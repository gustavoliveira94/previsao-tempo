import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GetWeather = ({ city, initCity }) => {
    const [weather, setWeather] = useState([]);

    console.log(weather);

    // Get Weather
    const getWeather = useCallback(async () => {
        try {
            const data = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?q=${initCity ||
                    city}&APPID=7ba73e0eb8efe773ed08bfd0627f07b8`
            );

            setWeather({
                weather: data.data,
            });
        } catch (e) {
            setWeather({
                weather: 'Nenhum local encontrado!',
            });
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
