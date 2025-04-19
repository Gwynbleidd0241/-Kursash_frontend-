import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchStudentById } from '../services/studentService';
import { Student } from '../types';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/helpers';
import '../styles/studentDetails.css';

const StudentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadStudent = async () => {
            try {
                if (id) {
                    const data = await fetchStudentById(id);
                    setStudent(data);
                }
            } catch (error) {
                setError('Не удалось загрузить данные студента');
            } finally {
                setLoading(false);
            }
        };
        loadStudent();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!student) return <div className="error-message">Студент не найден</div>;

    return (
        <div className="student-details-wrapper">
            <div className="student-card">
                <div className="student-header">
                    <h1>{student.fullName}</h1>
                    <Link to="/students" className="btn secondary">
                        ← Назад к списку
                    </Link>
                </div>

                <div className="student-section">
                    <h3>Контактная информация</h3>
                    <ul>
                        <li><strong>Email:</strong> {student.email}</li>
                        <li><strong>Возраст:</strong> {student.age}</li>
                    </ul>
                </div>

                <div className="student-section">
                    <h3>Курс</h3>
                    <ul>
                        <li><strong>Название:</strong> {student.course.title}</li>
                        <li><strong>Уровень:</strong> {student.course.level}</li>
                        <li><strong>Стоимость:</strong> {formatPrice(student.course.price)}</li>
                    </ul>
                </div>

                <div className="student-section">
                    <h3>Успеваемость</h3>
                    <span className={`performance-badge ${student.performance.replace(/\s+/g, '-').toLowerCase()}`}>
                        {student.performance}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
