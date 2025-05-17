import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../Courses';
import * as courseService from '../../services/courseService';
import { Course } from '../../types';

const mockCourses: Course[] = [
    {
        id: '1',
        title: 'React Basics',
        description: 'Intro to React',
        full_description: 'Learn the basics of React from scratch.',
        duration: 30,
        price: 2500,
        level: 'Начальный',
        photoUrl: '',
        materialsUrl: '',
        rating: 4.2,
        prerequisites: '',
        targetAudience: '',
        instructor: 'John Doe',
    },
    {
        id: '2',
        title: 'Advanced TypeScript',
        description: 'Deep dive into TS',
        full_description: 'Understand generics, utility types, and more.',
        duration: 40,
        price: 3000,
        level: 'PRO',
        photoUrl: '',
        materialsUrl: '',
        rating: 4.7,
        prerequisites: '',
        targetAudience: '',
        instructor: 'Jane Smith',
    },
];

jest.mock('../../services/courseService');

const renderPage = () => {
    render(
        <BrowserRouter>
            <Courses />
        </BrowserRouter>
    );
};

describe('Страница курсов', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Отображает список курсов после загрузки', async () => {
        (courseService.fetchCourses as jest.Mock).mockResolvedValue(mockCourses);
        renderPage();

        await waitFor(() => {
            expect(screen.getByText(/React Basics/i)).toBeInTheDocument();
            expect(screen.getByText(/Advanced TypeScript/i)).toBeInTheDocument();
        });
    });

    test('Отображает ошибку при сбое загрузки', async () => {
        (courseService.fetchCourses as jest.Mock).mockRejectedValue(new Error('Ошибка сервера'));
        renderPage();

        await waitFor(() => {
            expect(screen.getByText(/Ошибка сервера/i)).toBeInTheDocument();
        });
    });

    test('Отображаются кнопки "+ Новый курс" и "Назад"', async () => {
        (courseService.fetchCourses as jest.Mock).mockResolvedValue([]);
        renderPage();

        await waitFor(() => {
            expect(screen.getByText('+ Новый курс')).toBeInTheDocument();
            expect(screen.getByText(/Назад/i)).toBeInTheDocument();
        });
    });
});