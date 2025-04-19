import apiRequest from './api';
import { Course, CoursePayload } from '../types';

const API_BASE = 'https://67fd6f5f3da09811b175b728.mockapi.io/api/v1';

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