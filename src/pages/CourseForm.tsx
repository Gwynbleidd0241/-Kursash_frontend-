import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../services/courseService';

type FormData = {
    title: string;
    description: string;
    full_description: string;
    duration: string;
    price: string;
    level: 'Начальный' | 'Средний' | 'Продвинутый';
};

const CourseForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        full_description: '',
        duration: '',
        price: '',
        level: 'Начальный'
    });
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        price: false,
        duration: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, price: value }));
            setValidationErrors(prev => ({ ...prev, price: false }));
        } else {
            setValidationErrors(prev => ({ ...prev, price: true }));
        }
    };

    const handleDurationChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, duration: value }));
            setValidationErrors(prev => ({ ...prev, duration: false }));
        } else {
            setValidationErrors(prev => ({ ...prev, duration: true }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { title, description, full_description, duration, price } = formData;
        if (!title || !description || !full_description || !duration || !price) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        if (isNaN(Number(duration)) || isNaN(Number(price))) {
            setError('Цена и продолжительность должны быть числовыми значениями');
            return;
        }

        try {
            await createCourse({
                ...formData,
                price: Number(price),
                duration: Number(duration),
            });
            navigate('/courses');
        } catch (err) {
            setError('Ошибка при создании курса');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="form-container">
            <h1>Создание нового курса</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Название курса</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Краткое описание</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Полное описание</label>
                    <textarea
                        name="full_description"
                        value={formData.full_description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={`input-group ${validationErrors.duration ? 'error' : ''}`}>
                    <label>Продолжительность (в часах)</label>
                    <input
                        name="duration"
                        type="text"
                        value={formData.duration}
                        onChange={(e) => handleDurationChange(e.target.value)}
                        required
                    />
                    <span className="hint">Только цифры</span>
                </div>

                <div className={`input-group ${validationErrors.price ? 'error' : ''}`}>
                    <label>Цена (в тысячах ₽)</label>
                    <input
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        required
                    />
                    <span className="hint">Только цифры</span>
                </div>

                <div className="input-group">
                    <label>Уровень сложности</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                    >
                        <option value="Начальный">Начальный</option>
                        <option value="Средний">Средний</option>
                        <option value="Продвинутый">Продвинутый</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        Создать курс
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate('/courses')}
                    >
                        Отмена
                    </button>
                </div>

                {error && <div className="error-notification">{error}</div>}
            </form>
        </div>
    );
};

export default CourseForm;
