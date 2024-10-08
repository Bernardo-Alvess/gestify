import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Login } from '../pages/Login';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useContext(AuthContext);
	const [cookies] = useCookies(['id']);
	const location = useLocation();

	if (!isAuthenticated) {
		return <Login />;
	}

	if (location.pathname === '/') {
		return <Navigate to={`/home/${cookies.id}`} />;
	}

	if (location.pathname === '/login') {
		return <Navigate to={`/home/${cookies.id}`} />;
	}

	return children;
};

export { ProtectedRoute };