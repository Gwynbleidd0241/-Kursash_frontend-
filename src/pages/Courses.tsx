import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourse } from '../services/courseService';
import { Course } from '../types';
import Loader from '../components/Loader';
import CourseCard from '../components/CourseCard';
import Notification from '../components/Notification';
import { formatPrice, handleApiError } from '../utils/helpers';

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (err) {
                setError(handleApiError(err));
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteCourse(id);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            setError(handleApiError(error));
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="courses-page">
            <div className="page-header">
                <h1>Управление курсами</h1>
                <div className="actions-group">
                    <Link to="/" className="btn secondary">
                        Назад
                    </Link>
                    <Link to="/courses/new" className="btn primary">
                        + Новый курс
                    </Link>
                </div>
            </div>

            {error && <Notification type="error" message={error} onClose={() => setError('')} />}

            <div className="courses-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        formattedPrice={formatPrice(course.price)}
                        onDelete={() => handleDelete(course.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Courses;