import { Link } from 'react-router-dom';
import { Course } from '../types';

type Props = {
    course: Course;
    formattedPrice: string;
    onDelete?: (id: string) => void;
};

const CourseCard = ({ course, formattedPrice, onDelete }: Props) => (
    <div className="course-card">
        <h3>{course.title}</h3>
        <div className="course-info">
            <span className="price">{formattedPrice}</span>
            <span className="level">{course.level}</span>
        </div>
        <p className="description">{course.description}</p>
        <div className="actions">
            <Link to={`/courses/${course.id}`} className="details-link">
                Подробнее
            </Link>
            {onDelete && (
                <button
                    className="delete-btn"
                    onClick={() => onDelete(course.id)}
                >
                    Удалить
                </button>
            )}
        </div>
    </div>
);

export default CourseCard;