import { useLocation, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCourseById } from '../services/courseService';
import { Course } from '../types';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/helpers';

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    // Получаем информацию о том, с какой страницы пришли
    const location = useLocation();
    const from = location.state?.from || '/courses'; // Если нет состояния, возвращаем на страницу курсов

    useEffect(() => {
        const loadData = async () => {
            try {
                if (id) {
                    const data = await fetchCourseById(id);
                    setCourse(data);
                }
            } catch (error) {
                console.error('Ошибка загрузки данных курса:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) return <Loader />;
    if (!course) return <div className="error-message">Курс был удален. Обучение остановлено.</div>;

    return (
        <div className="course-details-wrapper">
            <div className="course-card">
                <div className="course-header">
                    <h1>{course.title}</h1>
                    <Link to={from} className="btn secondary">
                        ← Назад
                    </Link>
                </div>

                <div className="course-section">
                    <h3>Уровень</h3>
                    <p>{course.level}</p>
                </div>

                <div className="course-section">
                    <h3>Стоимость</h3>
                    <p>{formatPrice(course.price)}</p>
                </div>

                <div className="course-section">
                    <h3>Продолжительность</h3>
                    <p>{course.duration} часов</p>
                </div>

                <div className="course-section">
                    <h3>Полное описание</h3>
                    <p>{course.full_description}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
