import apiRequest from './api';
import { Student } from '../types';

export const fetchStudents = async (): Promise<Student[]> => {
    return apiRequest<Student[]>('students');
};

export const fetchStudentById = async (id: string): Promise<Student> => {
    return apiRequest<Student>(`students/${id}`);
};