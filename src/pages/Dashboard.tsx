import React, { useEffect, useState, useMemo } from 'react';
import { fetchCourses } from '../services/courseService';
import { fetchStudents } from '../services/studentService';
import Loader from '../components/Loader';
import StatsCard from '../components/StatsCard';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
    const [coursesCount, setCoursesCount] = useState(0);
    const [studentsCount, setStudentsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [courses, students] = await Promise.all([
                    fetchCourses(),
                    fetchStudents()
                ]);
                setCoursesCount(courses.length);
                setStudentsCount(students.length);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const courses = useMemo(() => coursesCount, [coursesCount]);
    const students = useMemo(() => studentsCount, [studentsCount]);

    if (loading) return <Loader />;

    return (
        <div className="dashboard-container">
            <LogoutButton />
            <h1>Добро пожаловать в Gwynbleidd!</h1>
            <div className="stats-grid">
                <StatsCard
                    title="Курсов на платформе"
                    count={courses}
                    link="/courses"
                />
                <StatsCard
                    title="Студентов обучается"
                    count={students}
                    link="/students"
                />
            </div>
        </div>
    );
};

export default React.memo(Dashboard);