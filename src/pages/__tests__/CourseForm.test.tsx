import { render, screen, fireEvent } from '@testing-library/react';
import CourseForm from '../CourseForm';
import { BrowserRouter } from 'react-router-dom';

const renderForm = () =>
    render(
        <BrowserRouter>
            <CourseForm />
        </BrowserRouter>
    );

describe('Форма курса', () => {
    test('Ошибка при незаполненных обязательных полях', () => {
        renderForm();
        fireEvent.click(screen.getByText(/Создать курс/i));
        expect(screen.getByText(/Все поля обязательны для заполнения/i)).toBeInTheDocument();
    });
});
