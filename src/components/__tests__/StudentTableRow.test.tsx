import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudentTableRow from '../StudentTableRow';
import { Student } from '../../types';
import { Course } from '../../types/Course';

const courseMock: Course = {
    id: '10',
    title: 'React',
    price: 100,
    level: 'Средний',
    duration: 40,
    description: 'Краткое описание React курса',
    full_description: 'Полное описание React курса',
    photoUrl: 'https://example.com/photo.jpg',
    materialsUrl: 'https://example.com/materials',
    rating: 4.8,
    prerequisites: 'Знания JS',
    targetAudience: 'Фронтендеры',
    instructor: 'Анна Смирнова',
};

const studentMock: Student = {
    id: '1',
    fullName: 'Иван Иванов',
    email: 'ivan@mail.ru',
    age: 20,
    city: 'Москва',
    phone: '8 999 123-45-67',
    photoUrl: 'https://example.com/photo.jpg',
    format: 'Онлайн',
    progress: 80,
    course: courseMock,
    performance: 'учиться средне',
};


test('StudentTableRow отображает данные студента и курса', () => {
    render(
        <BrowserRouter>
            <table>
                <tbody>
                <StudentTableRow student={{
                    id: '1',
                    fullName: 'Иван Иванов',
                    email: 'ivan@mail.ru',
                    age: 20,
                    city: '',
                    phone: '',
                    photoUrl: '',
                    format: 'Онлайн',
                    progress: 0,
                    performance: 'учиться средне',
                    course: courseMock,
                }} />
                </tbody>
            </table>
        </BrowserRouter>
    );

    expect(screen.getByText(/Иван Иванов/i)).toBeInTheDocument();
    expect(screen.getByText(/ivan@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Средняя/i)).toBeInTheDocument();
});
