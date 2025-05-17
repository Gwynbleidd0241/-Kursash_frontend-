import apiRequest from './api';
import { Course, CoursePayload } from '../types';

const API_BASE = 'https://681e251bc1c291fa66332e95.mockapi.io/api/lazarus';

export const fetchCourses = async (): Promise<Course[]> => {
    return apiRequest<Course[]>('courses');
};

export const fetchCourseById = async (id: string): Promise<Course> => {
    return apiRequest<Course>(`courses/${id}`);
};

export const createCourse = async (courseData: CoursePayload): Promise<Course> => {
    return apiRequest<Course>('courses', 'POST', courseData);
};

export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
    return apiRequest<Course>(`courses/${id}`, 'PUT', courseData);
};

export const deleteCourse = async (id: string): Promise<void> => {
    await apiRequest<void>(`courses/${id}`, 'DELETE');
};