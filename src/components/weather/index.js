/* eslint-disable radix */
/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Images
import iconInput from '../../assets/icons/44.svg';

// Styles
import Container from '../../style/weather/container';
import Content from '../../style/weather/content';
import ContainerInput from '../../style/weather/containerinput';
import Info from '../../style/weather/info';
import ContentInfo from '../../style/weather/contentinfo';
import Icon from '../../style/weather/icon';
import Tomorrow from '../../style/weather/tomorrow';
import Status from '../../style/weather/status';

const Weather = () => {
    const [state, setState] = useState({
        weather: [],
        initCity: '',
        city: '',
        lat: '',
        long: '',
        celsiusToDay: true,
        celsiusTomorrow: true,
        celsiusAfterTomorrow: true,
        farenheit: false,
        tempToDay: '',
        tempTomorrow: '',
        tempTAfterTomorrow: '',
        colorToDay: '',
        colorTomorrow: '',
        colorAfterTomorrow: '',
        loading: false,
        status: 'Carregando...',
    });

    // Get Weather
    const getWeather = useCallback(async () => {
        try {
            const data = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?q=${state.initCity ||
                    state.city}&APPID=7ba73e0eb8efe773ed08bfd0627f07b8`
            );

            setState({
                ...state,
                weather: data.data,
            });
        } catch (e) {
            setState({
                ...state,
                weather: [],
                status: 'Local não encontrado!',
            });
            console.log(e);
        }
    }, [state]);

    // Get Location Init
    const getLocation = useCallback(async () => {
        try {
            const data = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${state.lat},${state.long}&key=c63386b4f77e46de817bdf94f552cddf&language=en`
            );
            setState({
                ...state,
                initCity: data.data.results[0].components.city,
            });
        } catch (e) {
            console.log(e);
        }
    }, [state]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setState({
                ...state,
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
            if (state.lat && state.long) {
                getLocation();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.lat, state.long]);

    useEffect(() => {
        if (state.initCity) {
            getWeather();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initCity]);

    useEffect(() => {
        const convert = 273;

        const temp = [
            parseInt(
                state.weather.list && state.weather.list[0].main.temp - convert
            ),
            parseInt(
                state.weather.list && state.weather.list[1].main.temp - convert
            ),
            parseInt(
                state.weather.list && state.weather.list[2].main.temp - convert
            ),
        ];
        setState({
            ...state,
            colorToDay: temp[0],
            colorTomorrow: temp[1],
            colorAfterTomorrow: temp[2],
            tempToDay: parseInt(
                state.weather.list && state.weather.list[0].main.temp - convert
            ),
            tempTomorrow: parseInt(
                state.weather.list && state.weather.list[1].main.temp - convert
            ),
            tempAfterTomorrow: parseInt(
                state.weather.list && state.weather.list[2].main.temp - convert
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.weather]);

    const iconweather =
        state.weather &&
        state.weather.list &&
        state.weather.list[0].weather[0].icon;

    const statusDay =
        state.weather.list && state.weather.list[0].weather[0].description;

    return (
        <Container>
            <ContainerInput>
                <img src={iconInput} alt="" />
                <input
                    value={state.initCity || state.city}
                    placeholder="Digite uma cidade"
                    onChange={e =>
                        setState({
                            ...state,
                            initCity: '',
                            city: e.target.value,
                        })
                    }
                />
                <button type="button" onClick={() => getWeather()}>
                    Pesquisar
                </button>
            </ContainerInput>
            {/* Content Weather */}
            {state.weather && state.weather.list ? (
                <Content color={state.colorToDay}>
                    <Icon>
                        <img
                            src={`https://openweathermap.org/img/wn/${iconweather}@2x.png`}
                            alt=""
                        />
                    </Icon>
                    <Info>
                        <ContentInfo>
                            <h3>Hoje</h3>
                            <button
                                type="button"
                                title={`${parseInt(state.tempToDay)}${
                                    state.celsiusToDay ? 'º' : 'F'
                                }`}
                                onClick={() =>
                                    setState({
                                        ...state,
                                        tempToDay: state.celsiusToDay
                                            ? (state.tempToDay - 32) / 1.8
                                            : 1.8 * state.tempToDay + 32,
                                        celsiusToDay: !state.celsiusToDay,
                                        farenheit: !state.farenheit,
                                    })
                                }
                            >
                                {parseInt(state.tempToDay)}
                                {state.celsiusToDay ? 'º' : 'F'}
                            </button>
                        </ContentInfo>
                        <ContentInfo>
                            <h3>
                                {(statusDay === 'overcast clouds' &&
                                    'Céu Nublado') ||
                                    (statusDay === 'light rain' &&
                                        'Chuva Fraca') ||
                                    (statusDay === 'broken clouds' &&
                                        'Céu com nuvens') ||
                                    (statusDay === 'scattered clouds' &&
                                        'Céu com poucas nuvens') ||
                                    (statusDay === 'clear sky' &&
                                        'Céu sem nuvens') ||
                                    (statusDay === 'few clouds' &&
                                        'Céu com poucas nuvens')}
                            </h3>
                            <p>
                                Vento: NO {state.weather.list[0].wind.speed}
                                km/h
                            </p>
                            <p>
                                Humidade: {state.weather.list[0].main.humidity}%
                            </p>
                            <p>
                                Pressão: {state.weather.list[0].main.pressure}
                                hPA
                            </p>
                        </ContentInfo>
                        <Tomorrow tomorrow color={state.colorTomorrow}>
                            <div>
                                <h3>Amanhã</h3>
                                <button
                                    type="button"
                                    title={`${parseInt(state.tempTomorrow)}${
                                        state.celsiusTomorrow ? 'º' : 'F'
                                    }`}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            tempTomorrow: state.celsiusTomorrow
                                                ? (state.tempTomorrow - 32) /
                                                  1.8
                                                : 1.8 * state.tempTomorrow + 32,
                                            celsiusTomorrow: !state.celsiusTomorrow,
                                            farenheit: !state.farenheit,
                                        })
                                    }
                                >
                                    {parseInt(state.tempTomorrow)}
                                    {state.celsiusTomorrow ? 'º' : 'F'}
                                </button>
                            </div>
                        </Tomorrow>
                        <Tomorrow color={state.colorAfterTomorrow}>
                            <div>
                                <h3>Depois de Amanhã</h3>
                                <button
                                    title={`${parseInt(
                                        state.tempAfterTomorrow
                                    )}${
                                        state.celsiusAfterTomorrow ? 'º' : 'F'
                                    }`}
                                    type="button"
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            tempAfterTomorrow: state.celsiusAfterTomorrow
                                                ? (state.tempAfterTomorrow -
                                                      32) /
                                                  1.8
                                                : 1.8 *
                                                      state.tempAfterTomorrow +
                                                  32,
                                            celsiusAfterTomorrow: !state.celsiusAfterTomorrow,
                                            farenheit: !state.farenheit,
                                        })
                                    }
                                >
                                    {parseInt(state.tempAfterTomorrow)}
                                    {state.celsiusAfterTomorrow ? 'º' : 'F'}
                                </button>
                            </div>
                        </Tomorrow>
                    </Info>
                </Content>
            ) : (
                <Status>
                    <h1>{state.status}</h1>
                </Status>
            )}
        </Container>
    );
};

export default Weather;
