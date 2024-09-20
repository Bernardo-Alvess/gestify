import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Login } from './pages/Login';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
	<Toaster richColors />;
}

export default App;
