import apiRequest from './api';
import { Student } from '../types';

export const fetchStudents = async (): Promise<Student[]> => {
    return apiRequest<Student[]>('students');
};

export const fetchStudentById = async (id: string): Promise<Student> => {
    return apiRequest<Student>(`students/${id}`);
};

// Остальные методы остаются без изменений
export const createStudent = async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    return apiRequest<Student>('students', 'POST', studentData);
};

export const updateStudent = async (
    id: string,
    studentData: Partial<Student>
): Promise<Student> => {
    return apiRequest<Student>(`students/${id}`, 'PUT', studentData);
};

export const deleteStudent = async (id: string): Promise<void> => {
    await apiRequest<void>(`students/${id}`, 'DELETE');
};