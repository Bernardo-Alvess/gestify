import { IUpdateServiceOrder } from '../pages/OS/EditOs';

export const updateServiceOrder = async (
	token: string,
	id: string | undefined,
	data: IUpdateServiceOrder
) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/service-order/${id}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	);

	if (response.ok) return true;

	return false;
};
