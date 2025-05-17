import { Link } from 'react-router-dom';
import { Student } from '../types';
import { renderLoadByLevel } from '../utils/performanceHelpers';

interface Props {
    student: Student;
}

const StudentTableRow = ({ student }: Props) => (
    <tr>
        <td>{student.fullName}</td>
        <td>{student.email}</td>
        <td>
            <Link to={`/courses/${student.course.id}`} state={{ from: '/students' }}>
                {student.course.title}
            </Link>
        </td>
        <td>{renderLoadByLevel(student.course.level)}</td>
        <td>
            <Link to={`/students/${student.id}`} className="action-link">
                Просмотр
            </Link>
        </td>
    </tr>
);

export default StudentTableRow;
