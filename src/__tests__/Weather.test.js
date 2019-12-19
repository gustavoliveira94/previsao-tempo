/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Weather from '../components/weather';

describe('testing Weather', () => {
    cleanup(() => {
        render(<Weather />);
    });

    it('Successful weather', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn(),
        };
        global.navigator.geolocation = mockGeolocation;

        const {
            getByText,
            getByPlaceholderText,
            getByDisplayValue,
            getByTestId,
        } = render(<Weather />);

        expect(getByText('Pesquisar')).toBeTruthy();
        expect(getByPlaceholderText('Digite uma cidade')).toBeTruthy();
        expect(getByText('Carregando...')).toBeTruthy();
        fireEvent.change(getByPlaceholderText('Digite uma cidade'), {
            target: { value: 'Rio de Janeiro' },
        });
        expect(getByPlaceholderText('Digite uma cidade')).toBe(
            getByDisplayValue('Rio de Janeiro')
        );
        fireEvent.click(getByText('Pesquisar'));
        await wait(() => expect(getByText('Hoje')).toBeTruthy());
        expect(getByText('Amanhã')).toBeTruthy();
        expect(getByText('Depois de Amanhã')).toBeTruthy();

        expect(getByTestId('convert')).toHaveTextContent('Cº');
        fireEvent.click(getByTestId('convert'));
        expect(getByTestId('convert')).toHaveTextContent('Fº');
    });

    it('Failed weather', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn(),
        };
        global.navigator.geolocation = mockGeolocation;

        const { getByText, getByPlaceholderText, getByDisplayValue } = render(
            <Weather />
        );

        fireEvent.change(getByPlaceholderText('Digite uma cidade'), {
            target: { value: 'Rio de Janeir' },
        });
        expect(getByPlaceholderText('Digite uma cidade')).toBe(
            getByDisplayValue('Rio de Janeir')
        );
        fireEvent.click(getByText('Pesquisar'));
        await wait(() =>
            expect(getByText('Nenhum local encontrado!')).toBeTruthy()
        );
    });
});
