// import { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import { getProducts } from '../http/get-products';
// import { useCookies } from 'react-cookie';
// import { toast } from 'sonner';
// import { addProductToSo } from '../data/products-so';
// import { getProductsForSo } from '../http/get-products-for-so';
// import { getProductForSo } from '../http/get-product-for-so';

// interface EditProductModal {
// 	serviceOrderId: string | undefined;
// 	toggle: boolean;
// 	onClose: () => void;
// 	relationId: string | undefined;
// }

// interface Product {
// 	id: string;
// 	name: string;
// 	price: number;
// 	cost: number;
// 	qtd: number;
// 	unityType: string;
// }

// interface IFormValues {
// 	id: string | undefined;
// 	product: string | undefined;
// 	quantity: number | undefined;
// 	price: number | undefined;
// 	cost: number | undefined;
// 	qtd: number | undefined;
// }

// const EditProductModal = ({
// 	toggle,
// 	onClose,
// 	serviceOrderId,
// 	relationId,
// }: EditProductModal) => {
// 	if (!toggle) return null;

// 	const [cookies] = useCookies(['jwt']);
// 	const [data, setData] = useState<Product | undefined>(undefined);

// 	const [formValues, setFormValues] = useState<IFormValues>({
// 		id: undefined,
// 		product: undefined,
// 		quantity: undefined,
// 		price: undefined,
// 		cost: undefined,
// 		qtd: undefined,
// 	});

// 	const handleChange = (
// 		e: ChangeEvent<
// 			HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
// 		>
// 	) => {
// 		setFormValues((prevValues) => ({
// 			id: data?.id,
// 			product: data?.name,
// 			price: data?.price,
// 			cost: data?.cost,
// 			qtd: formValues?.qtd,
// 			quantity: prevValues.quantity,
// 		}));
// 	};

// 	// const fetchProducts = useCallback(async () => {
// 	// 	const products = await getProducts(cookies.jwt);
// 	// 	if (products != data) setData(products);
// 	// }, []);

// 	const fetchProductForOs = useCallback(async () => {
// 		const { product } = await getProductForSo(cookies.jwt, relationId);

// 		if (product != undefined) setData(product);

// 		setFormValues((prevValues) => ({
// 			id: data?.id,
// 			product: data?.name,
// 			price: data?.price,
// 			cost: data?.cost,
// 			qtd: data?.qtd,
// 			quantity: prevValues.quantity,
// 		}));
// 	}, []);

// 	useEffect(() => {
// 		fetchProductForOs();
// 	}, [fetchProductForOs]);

// 	//#TODO: enviar productId que esta faltando e serviceOrderId que também esta faltando no schema
// 	const handleSubmit = async () => {
// 		// addProductToSo({
// 		// 	productId: formValues.id,
// 		// 	name: formValues.product,
// 		// 	price: formValues.price,
// 		// 	qtd: formValues.quantity,
// 		// 	cost: formValues.cost,
// 		// 	totalCost: formValues.price! * formValues.quantity!,
// 		// });
// 		console.log(data);
// 		toast.success('Produto adicionado a ordem de Serviço');
// 	};

// 	return (
// 		<div
// 			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
// 			onClick={onClose}
// 		>
// 			<div
// 				className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
// 				onClick={(e) => e.stopPropagation()}
// 			>
// 				<div className="flex justify-between items-center mb-4">
// 					<h2 className="text-xl font-bold">Editar produto</h2>
// 					<button
// 						onClick={onClose}
// 						className="text-gray-500 hover:text-gray-800"
// 					>
// 						&times;
// 					</button>
// 				</div>

// 				<form className="grid grid-cols-2 gap-4">
// 					{/* <select onChange={handleChange} name="product-select">
// 						<option value="">Escolha um produto</option>
// 						{data?.map((product, index) => (
// 							<option key={index} value={product?.id}>
// 								{product.name}
// 							</option>
// 						))}
// 					</select> */}
// 					<div>
// 						<label htmlFor="product">Produto</label>
// 						<input
// 							readOnly
// 							type="text"
// 							value={data?.name}
// 							className="w-full border rounded p-2"
// 						/>
// 					</div>
// 					<div>
// 						<label
// 							htmlFor="quantidade"
// 							className="block text-sm font-semibold"
// 						>
// 							Quantidade
// 						</label>
// 						<input
// 							onChange={handleChange}
// 							value={formValues?.qtd}
// 							type="number"
// 							id="quantidade"
// 							name="quantity"
// 							className="w-full border rounded p-2"
// 						/>
// 					</div>
// 					<div>
// 						<label
// 							htmlFor="price"
// 							className="block text-sm font-semibold"
// 						>
// 							Preço
// 						</label>
// 						<input
// 							value={data?.price}
// 							disabled
// 							type="text"
// 							id="price"
// 							name="price"
// 							className="w-full border rounded p-2"
// 						/>
// 					</div>
// 					<div>
// 						<label
// 							htmlFor="cost"
// 							className="block text-sm font-semibold"
// 						>
// 							Custo
// 						</label>
// 						<input
// 							value={data?.cost}
// 							disabled
// 							type="text"
// 							id="cost"
// 							name="cost"
// 							className="w-full border rounded p-2"
// 						/>
// 					</div>
// 					<button
// 						onClick={handleSubmit}
// 						type="button"
// 						className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
// 					>
// 						Adicionar Produto
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default EditProductModal;

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import { addProductToSo } from '../data/products-so';
import { getProductForSo } from '../http/get-product-for-so';
import { updateProductServiceOrder } from '../http/update-product-service-order';

interface EditProductModalProps {
	serviceOrderId: string | undefined;
	toggle: boolean;
	onClose: () => void;
	relationId: string | undefined;
}

interface Product {
	id: string;
	name: string;
	price: number;
	cost: number;
	qtd: number;
	unityType: string;
}

interface IFormValues {
	id: string | undefined;
	product: string | undefined;
	quantity: number | undefined;
	price: number | undefined;
	cost: number | undefined;
	qtd: number | undefined;
}

const EditProductModal = ({
	toggle,
	onClose,
	serviceOrderId,
	relationId,
}: EditProductModalProps) => {
	if (!toggle) return null;

	const [cookies] = useCookies(['jwt']);
	const [data, setData] = useState<Product | undefined>(undefined);
	const [formValues, setFormValues] = useState<IFormValues>({
		id: undefined,
		product: undefined,
		quantity: undefined,
		price: undefined,
		cost: undefined,
		qtd: undefined,
	});

	const handleChange = (
		e: ChangeEvent<
			HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
		>
	) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const fetchProductForOs = useCallback(async () => {
		try {
			const { product } = await getProductForSo(cookies.jwt, relationId);

			if (product) {
				setData(product);
				setFormValues({
					id: product.id,
					product: product.name,
					price: product.price,
					cost: product.cost,
					qtd: product.qtd,
					quantity: undefined,
				});
			}
		} catch (error) {
			toast.error('Erro ao carregar o produto.');
		}
	}, []);

	useEffect(() => {
		fetchProductForOs();
	}, [fetchProductForOs]);

	const handleSubmit = async () => {
		if (!formValues.id || !serviceOrderId || !relationId) {
			toast.error('Campos obrigatórios estão faltando.');
			return;
		}

		if (!formValues.quantity || formValues.quantity <= 0) {
			toast.error('Quantidade deve ser maior que zero.');
			return;
		}

		try {
			const success = await updateProductServiceOrder(
				cookies.jwt,
				relationId,
				serviceOrderId,
				formValues.id,
				formValues.quantity
			);

			if (success) {
				toast.success('Produto atualizado com sucesso!');
				onClose(); // Fecha o modal após o sucesso
			} else {
				toast.error('Erro ao atualizar o produto.');
			}
		} catch (error) {
			toast.error('Erro ao atualizar o produto.');
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
			onClick={onClose}
		>
			<div
				className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Editar produto</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-800"
					>
						&times;
					</button>
				</div>

				<form className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="product"
							className="block text-sm font-semibold"
						>
							Produto
						</label>
						<input
							readOnly
							type="text"
							value={data?.name || 'Carregando...'}
							className="w-full border rounded p-2"
						/>
					</div>
					<div>
						<label
							htmlFor="quantity"
							className="block text-sm font-semibold"
						>
							Quantidade
						</label>
						<input
							onChange={handleChange}
							value={formValues.quantity || ''}
							type="number"
							id="quantity"
							name="quantity"
							className="w-full border rounded p-2"
						/>
					</div>
					<div>
						<label
							htmlFor="price"
							className="block text-sm font-semibold"
						>
							Preço
						</label>
						<input
							value={data?.price || ''}
							disabled
							type="text"
							id="price"
							name="price"
							className="w-full border rounded p-2"
						/>
					</div>
					<div>
						<label
							htmlFor="cost"
							className="block text-sm font-semibold"
						>
							Custo
						</label>
						<input
							value={data?.cost || ''}
							disabled
							type="text"
							id="cost"
							name="cost"
							className="w-full border rounded p-2"
						/>
					</div>
					<button
						onClick={handleSubmit}
						type="button"
						className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
					>
						Adicionar Produto
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
