import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { BrowserRouter } from 'react-router-dom';
import * as courseService from '../../services/courseService';
import * as studentService from '../../services/studentService';

jest.mock('../../services/courseService');
jest.mock('../../services/studentService');

const mockCourses = [
    { id: '1', title: 'React' },
    { id: '2', title: 'Vue' },
];

const mockStudents = [
    { id: '1', fullName: 'Иван Иванов' },
    { id: '2', fullName: 'Анна Петрова' },
    { id: '3', fullName: 'Петр Сидоров' },
];

describe('Dashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('отображает количество курсов и студентов после загрузки', async () => {
        (courseService.fetchCourses as jest.Mock).mockResolvedValue(mockCourses);
        (studentService.fetchStudents as jest.Mock).mockResolvedValue(mockStudents);

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Курсов на платформе/i)).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText(/Студентов обучается/i)).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
        });
    });

    test('обрабатывает ошибку при загрузке', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        (courseService.fetchCourses as jest.Mock).mockRejectedValue(new Error('Ошибка сервера'));
        (studentService.fetchStudents as jest.Mock).mockRejectedValue(new Error('Ошибка сервера'));

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Ошибка загрузки данных:', expect.any(Error));
        });

        consoleSpy.mockRestore();
    });
});
