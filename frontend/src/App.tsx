import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { router } from './routes/router';
import { AuthProvider } from './context/auth';

function App() {
	return (
		<>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster invert richColors />
			</AuthProvider>
		</>
	);
}

export default App;
