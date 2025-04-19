export interface Course {
    full_description: string;
    duration: any;
    id: string;
    title: string;
    price: number;
    description: string;
    level: 'Начальный' | 'Средний' | 'Продвинутый';
}

export type CoursePayload = Omit<Course, 'id'>;