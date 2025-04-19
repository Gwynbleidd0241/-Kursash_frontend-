import { Navigate } from 'react-router-dom';
import {JSX} from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;