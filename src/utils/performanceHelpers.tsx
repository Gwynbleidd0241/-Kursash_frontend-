import React, {JSX} from 'react';

export const renderLoadByLevel = (level: string): JSX.Element => {
    switch (level) {
        case 'Начальный':
            return <span style={{ color: 'black'}}>Минимальная</span>;
        case 'Средний':
            return <span style={{ color: 'black'}}>Средняя</span>;
        case 'PRO':
            return <span style={{ color: 'black'}}>Повышенная</span>;
        default:
            return <span style={{ color: 'gray' }}>Неизвестно</span>;
    }
};
