import { ReactNode, createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}
interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'id']);
	const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.jwt);

	const login = (token: string) => {
		setIsAuthenticated(true);
		//setCookie('jwt', token, { path: '/', maxAge: 3 * 24 * 60 * 60 });
	};

	const logout = () => {
		setIsAuthenticated(false);
		// Object.keys(cookies).forEach((cookieName) => {
		// 	removeCookie(cookieName, { path: '/' });
		// });
		removeCookie('jwt', { path: '/' });
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
