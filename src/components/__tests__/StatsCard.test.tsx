import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StatsCard from '../StatsCard';

describe('StatsCard', () => {
    const props = {
        title: 'Students',
        count: 42,
        link: '/students'
    };

    test('отображает заголовок, число и ссылку', () => {
        render(
            <BrowserRouter>
                <StatsCard {...props} />
            </BrowserRouter>
        );

        expect(screen.getByText('Students')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/students');
    });
});
