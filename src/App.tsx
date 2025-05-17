import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetails = lazy(() => import('./pages/CourseDetails'));
const CourseForm = lazy(() => import('./pages/CourseForm'));
const Students = lazy(() => import('./pages/Students'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/courses" element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    } />

                    <Route path="/courses/new" element={
                        <ProtectedRoute>
                            <CourseForm />
                        </ProtectedRoute>
                    } />

                    <Route path="/courses/:id" element={
                        <ProtectedRoute>
                            <CourseDetails />
                        </ProtectedRoute>
                    } />

                    <Route path="/students" element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    } />

                    <Route path="/students/:id" element={
                        <ProtectedRoute>
                            <StudentDetails />
                        </ProtectedRoute>
                    } />

                    <Route path="/courses/:id/edit" element={
                        <ProtectedRoute>
                            <CourseForm />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;