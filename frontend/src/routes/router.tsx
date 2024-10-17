import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignUp } from '../pages/SignUp';
import { ProtectedRoute } from '../components/protected-route';
import { Login } from '../pages/Login';
import { Products } from '../pages/Products';
import { Users } from '../pages/Users';
import { ServiceOrders } from '../pages/ServiceOrders';
import { Clients } from '../pages/Clients';
import { ViewUser } from '../pages/ViewUser';
import { CreateClient } from '../pages/CreateClient';
const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute children={<Home />} />,
	},
	{
		path: '/login',
		element: <ProtectedRoute children={<Home />} />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/home/:id',
		element: <ProtectedRoute children={<Home />} />,
	},
	{
		path: '/*',
		element: <Login />,
	},
	{
		path: '/products',
		element: <ProtectedRoute children={<Products />} />,
	},
	{
		path: '/users',
		element: <ProtectedRoute children={<Users />} />,
	},
	{
		path: '/orders',
		element: <ProtectedRoute children={<ServiceOrders />} />,
	},
	{
		path: '/clients',
		element: <ProtectedRoute children={<Clients />} />,
	},
	{
		path: '/view-user/:id',
		element: <ProtectedRoute children={<ViewUser />} />,
	},
	{
		path: 'create-user',
		element: <ProtectedRoute children={<CreateClient />} />,
	},
]);

export { router };
