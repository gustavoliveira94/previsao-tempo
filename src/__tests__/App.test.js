/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import mockAxios from 'axios';
import App from '../App';

jest.mock('axios');

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

describe('testing App', () => {
    it('render app', () => {
        mockAxios.get.mockImplementationOnce({
            data: 'test.jpg',
        });

        render(<App />);
    });
});
