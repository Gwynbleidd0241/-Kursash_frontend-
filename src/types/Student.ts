import { Course } from './Course';

export interface Student {
    id: string;
    fullName: string;
    email: string;
    age: number;
    course: Course;
    performance: 'учиться легко' | 'учиться средне' | 'учиться тяжело';
}

export type StudentFormData = Omit<Student, 'id' | 'course'> & {
    courseId: string;
};