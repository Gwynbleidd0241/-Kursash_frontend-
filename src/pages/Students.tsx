import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents } from '../services/studentService';
import { Student } from '../types';
import Loader from '../components/Loader';
import StudentTableRow from '../components/StudentTableRow';

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchStudents();
                setStudents(data);
            } catch (error) {
                console.error('Ошибка загрузки студентов:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="page-container">
            <h1>Список студентов</h1>

            <Link to="/" className="back-button">
                ← Назад
            </Link>

            <div className="students-table-wrapper">
                <table className="students-table">
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Email</th>
                        <th>Курс</th>
                        <th>Успеваемость</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => (
                        <StudentTableRow
                            key={student.id}
                            student={student}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;