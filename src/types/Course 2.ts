export interface Course {
    id: string;
    title: string;
    description: string;
    full_description: string;
    duration: any;
    price: number;
    level: 'Начальный' | 'Средний' | 'PRO';
    photoUrl: string;
    materialsUrl: string;
    rating: number;
    prerequisites: string;
    targetAudience: string;
    instructor: string;
}

export type CoursePayload = Omit<Course, 'id'>;
