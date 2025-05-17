import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CourseDetails from '../CourseDetails';
import * as api from '../../services/courseService';
import { Course } from '../../types';

jest.mock('../../services/courseService');

const mockCourse: Course = {
    id: '1',
    title: 'React',
    description: '',
    full_description: 'Полное описание',
    duration: 10,
    price: 2000,
    level: 'Средний',
    rating: 4.5,
    materialsUrl: '',
    photoUrl: '',
    prerequisites: '',
    targetAudience: '',
    instructor: 'Анна Смирнова',
};

describe('CourseDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('показывает Loader при загрузке', async () => {
        (api.fetchCourseById as jest.Mock).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve(mockCourse), 100))
        );

        render(
            <MemoryRouter initialEntries={['/courses/1']}>
                <Routes>
                    <Route path="/courses/:id" element={<CourseDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        await screen.findByText(/React/i);
    });

    test('показывает сообщение если курс не найден', async () => {
        (api.fetchCourseById as jest.Mock).mockResolvedValue(null);

        render(
            <MemoryRouter initialEntries={['/courses/1']}>
                <Routes>
                    <Route path="/courses/:id" element={<CourseDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Курс был удален/i)).toBeInTheDocument();
    });

    test('отображает заголовок и преподавателя', async () => {
        (api.fetchCourseById as jest.Mock).mockResolvedValue(mockCourse);

        render(
            <MemoryRouter initialEntries={['/courses/1']}>
                <Routes>
                    <Route path="/courses/:id" element={<CourseDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/React/i)).toBeInTheDocument();
        expect(screen.getByText(/Анна Смирнова/i)).toBeInTheDocument();
    });
});
