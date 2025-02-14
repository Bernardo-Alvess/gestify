import { ReactNode, createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}
interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'id']);
	const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.jwt);

	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = () => {
		setIsAuthenticated(false);
		removeCookie('jwt', { path: '/' });
		removeCookie('id', { path: '/' });
	};

	useEffect(() => {
		setIsAuthenticated(!!cookies.jwt);
	}, [cookies.jwt]);

	const value = {
		isAuthenticated,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export { AuthContext };
