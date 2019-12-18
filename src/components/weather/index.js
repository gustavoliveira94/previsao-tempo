/* eslint-disable no-return-assign */
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

// API
import GetWeather from '../../api/getweather';

const Weather = () => {
    const [state, setState] = useState({
        weather: [],
        initCity: '',
        city: '',
        getCity: '',
        lat: '',
        long: '',
        celsius: [true, true, true],
        temp: [],
        status: 'Carregando...',
    });
    const useWeather = GetWeather({
        city: state.city,
        initCity: state.initCity,
    });

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
        if (state.initCity || useWeather) {
            setState({
                ...state,
                weather:
                    useWeather !== 'Nenhum local encontrado!'
                        ? useWeather.weather
                        : setState({ ...state, status: useWeather }),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initCity, useWeather]);

    useEffect(() => {
        const convert = 273;

        const temp = [
            parseInt(
                state.weather &&
                    state.weather.list &&
                    state.weather.list[0].main.temp - convert
            ),
            parseInt(
                state.weather &&
                    state.weather.list &&
                    state.weather.list[1].main.temp - convert
            ),
            parseInt(
                state.weather &&
                    state.weather.list &&
                    state.weather.list[2].main.temp - convert
            ),
        ];
        setState({
            ...state,
            temp,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.weather]);

    const changeTemp = index => {
        setState({
            ...state,
            ...(state.temp[index] = state.celsius[index]
                ? (state.temp[index] - 32) / 1.8
                : 1.8 * state.temp[index] + 32),
            ...(state.celsius[index] = !state.celsius[index]),
        });
    };

    const iconweather =
        state.weather &&
        state.weather.list &&
        state.weather.list[0].weather[0].icon;

    const statusDay =
        state.weather &&
        state.weather.list &&
        state.weather.list[0].weather[0].description;

    console.log(state.weather);

    return (
        <Container>
            <ContainerInput>
                <img src={iconInput} alt="" />
                <input
                    value={state.initCity || state.getCity}
                    placeholder="Digite uma cidade"
                    onChange={e =>
                        setState({
                            ...state,
                            initCity: '',
                            getCity: e.target.value,
                        })
                    }
                />
                <button
                    type="button"
                    onClick={() => {
                        setState({ ...state, city: state.getCity });
                    }}
                >
                    Pesquisar
                </button>
            </ContainerInput>
            {/* Content Weather */}
            {state.weather && state.weather.list ? (
                <Content celsius={state.celsius[0]} color={state.temp[0]}>
                    <Icon>
                        <img
                            src={`https://openweathermap.org/img/wn/${iconweather}@2x.png`}
                            alt="Weather"
                        />
                    </Icon>
                    <Info>
                        <ContentInfo>
                            <h3>Hoje</h3>
                            <button
                                type="button"
                                title={`${parseInt(state.temp[0])}${
                                    state.celsius[0] ? 'Cº' : 'Fº'
                                }`}
                                onClick={() => changeTemp(0)}
                            >
                                {parseInt(state.temp[0])}
                                {state.celsius[0] ? 'Cº' : 'Fº'}
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
                        <Tomorrow
                            tomorrow
                            celsius={state.celsius[1]}
                            color={state.temp[1]}
                        >
                            <div>
                                <h3>Amanhã</h3>
                                <button
                                    type="button"
                                    title={`${parseInt(state.temp[1])}${
                                        state.celsius[1] ? 'Cº' : 'Fº'
                                    }`}
                                    onClick={() => changeTemp(1)}
                                >
                                    {parseInt(state.temp[1])}
                                    {state.celsius[1] ? 'Cº' : 'Fº'}
                                </button>
                            </div>
                        </Tomorrow>
                        <Tomorrow
                            celsius={state.celsius[2]}
                            color={state.temp[2]}
                        >
                            <div>
                                <h3>Depois de Amanhã</h3>
                                <button
                                    title={`${parseInt(state.temp[2])}${
                                        state.celsius[2] ? 'Cº' : 'Fº'
                                    }`}
                                    type="button"
                                    onClick={() => changeTemp(2)}
                                >
                                    {parseInt(state.temp[2])}
                                    {state.celsius[2] ? 'Cº' : 'Fº'}
                                </button>
                            </div>
                        </Tomorrow>
                    </Info>
                </Content>
            ) : (
                <Status>
                    <h1>
                        {state.weather !== 'Nenhum local encontrado!'
                            ? state.status
                            : state.weather}
                    </h1>
                </Status>
            )}
        </Container>
    );
};

export default Weather;
