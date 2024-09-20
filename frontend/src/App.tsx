import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster invert richColors />;
		</>
	);
}

export default App;
