import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getProducts } from '../http/get-products';
import { useCookies } from 'react-cookie';

interface AddProductModalProps {
	toggle: boolean;
	onClose: () => void;
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
	product: string | undefined;
	quantity: number | undefined;
	price: number | undefined;
	cost: number | undefined;
	qtd: number | undefined;
}

const AddProductModal = ({ toggle, onClose }: AddProductModalProps) => {
	if (!toggle) return null;

	const [cookies] = useCookies(['jwt']);
	const [data, setData] = useState<Product[] | undefined>(undefined);

	const [formValues, setFormValues] = useState<IFormValues>({
		product: '',
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
		let { value } = e.target;

		const selectedProduct = data?.find((product) => product.id === value);

		setFormValues((prevValues) => ({
			product: selectedProduct?.name,
			price: selectedProduct?.price,
			cost: selectedProduct?.cost,
			qtd: selectedProduct?.qtd,
			quantity: prevValues.quantity,
		}));
	};

	const fetchProducts = useCallback(async () => {
		const products = await getProducts(cookies.jwt);
		if (products != data) setData(products);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	//TODO - Enviar relaçao para o banco de dados, adicionar campo na tabela para a quantidade de produtos naquela relaçao, quando retornar os produtos, retornar um objeto do produto com um campo a mais de quantidade

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
					<h2 className="text-xl font-bold">Adicione um produto</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-800"
					>
						&times;
					</button>
				</div>

				<form className="grid grid-cols-2 gap-4">
					<select onChange={handleChange} name="product-select">
						<option value="">Escolha um produto</option>
						{data?.map((product, index) => (
							<option key={index} value={product?.id}>
								{product.name}
							</option>
						))}
					</select>

					<div>
						<label
							htmlFor="quantidade"
							className="block text-sm font-semibold"
						>
							Quantidade
						</label>
						<input
							value={formValues.quantity}
							type="number"
							id="quantidade"
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
							value={formValues.price}
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
							value={formValues.cost}
							disabled
							type="text"
							id="cost"
							name="cost"
							className="w-full border rounded p-2"
						/>
					</div>

					<div>
						<label
							htmlFor="qtd"
							className="block text-sm font-semibold"
						>
							Estoque
						</label>
						<input
							value={formValues.qtd}
							disabled
							type="text"
							id="qtd"
							name="qtd"
							className="w-full border rounded p-2"
						/>
					</div>

					<button
						type="submit"
						className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
					>
						Adicionar Produto
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProductModal;
