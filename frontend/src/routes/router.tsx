import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignUp } from '../pages/SignUp';
import { ProtectedRoute } from '../components/protected-route';
import { Login } from '../pages/Login';
import { Products } from '../pages/Products';
import { Users } from '../pages/Users/Users';
import { ServiceOrders } from '../pages/OS/ServiceOrders';
import { ViewClient } from '../pages/Clients/ViewClient';
import { CreateClient } from '../pages/Clients/CreateClient';
import { EditClient } from '../pages/Clients/EditClients';
import { ViewUser } from '../pages/Users/ViewUser';
import { EditUser } from '../pages/Users/EditUser';
import { ViewOS } from '../pages/OS/ViewOS';
import { CreateOS } from '../pages/OS/CreateOS';
import { Clients } from '../pages/Clients/Clients';
import { EditOs } from '../pages/OS/EditOs';
import { CreateUser } from '../pages/Users/CreateUser';
import { CreateProduct } from '../pages/Products/CreateProduct';

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
		path: 'create-product',
		element: <ProtectedRoute children={<CreateProduct />} />,
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
		path: '/view-client/:id',
		element: <ProtectedRoute children={<ViewClient />} />,
	},
	{
		path: '/create-client',
		element: <ProtectedRoute children={<CreateClient />} />,
	},
	{
		path: '/edit-client/:id',
		element: <ProtectedRoute children={<EditClient />} />,
	},
	{
		path: '/view-user/:id',
		element: <ProtectedRoute children={<ViewUser />} />,
	},
	{
		path: '/edit-user/:id',
		element: <ProtectedRoute children={<EditUser />} />,
	},
	{
		path: 'create-user',
		element: <ProtectedRoute children={<CreateUser />} />,
	},
	{
		path: '/viewos/:id',
		element: <ProtectedRoute children={<ViewOS />} />,
	},
	{
		path: '/createos',
		element: <ProtectedRoute children={<CreateOS />} />,
	},
	{
		path: '/editos/:id',
		element: <ProtectedRoute children={<EditOs/>}/>
	}
]);

export { router };
