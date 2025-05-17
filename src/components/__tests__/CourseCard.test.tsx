import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from '../CourseCard';
import { Course } from '../../types';

const courseMock: Course = {
    id: 'c1',
    title: 'JavaScript для начинающих',
    description: 'Краткое описание',
    full_description: 'Полное описание',
    duration: 40,
    price: 1999,
    level: 'Начальный',
    photoUrl: 'https://example.com/photo.jpg',
    materialsUrl: 'https://example.com/materials',
    rating: 4.5,
    prerequisites: 'Базовые знания',
    targetAudience: 'Новички',
    instructor: 'Иван Петров',
};

const formattedPrice = '1 999 ₽';

describe('CourseCard', () => {
    test('отображает заголовок, уровень, цену и изображение', () => {
        render(
            <BrowserRouter>
                <CourseCard course={courseMock} formattedPrice={formattedPrice} />
            </BrowserRouter>
        );

        expect(screen.getByText(/JavaScript для начинающих/i)).toBeInTheDocument();
        expect(screen.getByText(/Начальный/i)).toBeInTheDocument();
        expect(screen.getByAltText(/JavaScript для начинающих/i)).toBeInTheDocument();
        expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    });

    test('вызывает onDelete при клике на кнопку "Удалить"', () => {
        const handleDelete = jest.fn();

        render(
            <BrowserRouter>
                <CourseCard
                    course={courseMock}
                    formattedPrice={formattedPrice}
                    onDelete={handleDelete}
                />
            </BrowserRouter>
        );

        const deleteButton = screen.getByText(/Удалить/i);
        fireEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalledWith('c1');
    });
});
