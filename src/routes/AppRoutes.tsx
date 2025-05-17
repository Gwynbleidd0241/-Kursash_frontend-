import {Routes, Route, Navigate, BrowserRouter as Router} from 'react-router-dom';
import React, {JSX, lazy, Suspense} from 'react';
import Loader from '../components/Loader';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Students = lazy(() => import('../pages/Students'));
const Courses = lazy(() => import('../pages/Courses'));
const CourseForm = lazy(() => import ('../pages/CourseForm'));
const StudentDetails = lazy(() => import('../pages/StudentDetails'));
const CourseDetails = lazy(() => import('../pages/CourseDetails'));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => (
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

export default AppRouter;