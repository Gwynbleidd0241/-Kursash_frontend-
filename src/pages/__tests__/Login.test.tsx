import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

const renderLogin = () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
};

describe('Страница входа администратора', () => {
    test('Отображаются поля ввода и кнопка', () => {
        renderLogin();

        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
        expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
    });
});
