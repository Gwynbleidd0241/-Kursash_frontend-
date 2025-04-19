import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { isAuthenticated } from '../utils/auth';
import Notification from '../components/Notification';

const Login = () => {
    const [credentials, setCredentials] = useState({ login: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (credentials.login === 'admin' && credentials.password === 'admin') {
            localStorage.setItem('authenticated', 'true');
            navigate('/');
        } else {
            setError('Неверный логин или пароль');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1>Авторизация администратора</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Логин"
                        type="text"
                        value={credentials.login}
                        onChange={(e) => setCredentials({...credentials, login: e.target.value})}
                        required
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                    />
                    <Button type="submit" fullWidth>
                        Войти
                    </Button>
                    {error && <Notification
                        type="error"
                        message={error}
                        onClose={() => setError('')}
                    />}
                </form>
            </div>
        </div>
    );
};

export default Login;