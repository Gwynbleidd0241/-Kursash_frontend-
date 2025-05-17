import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: jest.fn(),
    };
});

describe('LogoutButton', () => {
    test('удаляет "authenticated" из localStorage и редиректит на /login', () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        localStorage.setItem('authenticated', 'true');

        render(
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /выйти/i }));
        expect(localStorage.getItem('authenticated')).toBe(null);
        expect(navigate).toHaveBeenCalledWith('/login');
    });
});
