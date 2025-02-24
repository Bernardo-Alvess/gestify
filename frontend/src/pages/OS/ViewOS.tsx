import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { useParams } from 'react-router-dom';
import { getProductsForSo } from '../../http/get-products-for-so';
import { getServiceOrdersById } from '../../http/get-service-order-by-id';
import jsPDF from 'jspdf';
import ReactInputMask from 'react-input-mask';


interface IFormValues {
	client: string;
	technician: string;
	number: string;
	defect: string;
	report: string;
	description: string;
	extras: string;
	date: string;
}

export const ViewOS: React.FC = () => {
	const { id } = useParams();
	const today = new Date().toLocaleDateString('pt-BR');
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [products, setProducts] = useState([{}]);
	const [cookies] = useCookies(['jwt', 'id']);
	const [totalValue, setTotalValue] = useState(0);

	const [formValues, setFormValues] = useState<IFormValues>({
		client: '',
		technician: '',
		number: '',
		defect: '',
		report: '',
		description: '',
		extras: '',
		date: today,
	});

	const columns = [
		'Código',
		'Nome',
		'Preço',
		'Custo',
		'Tipo UN',
		'QTD',
		'Id Relação',
		'Valor Total',
	];

	const fetchServiceOrder = useCallback(async () => {
		const data = await getServiceOrdersById(cookies.jwt, id);
		setFormValues({
			client: data.clientId || '',
			technician: data.technicianId || '',
			number: data.number || '',
			defect: data.defect || '',
			report: data.report || '',
			description: data.description || '',
			extras: data.extras || '',
			date: new Date(data.date).toLocaleDateString('pt-BR'),
		});
		setSelectedOption(data.status);
	}, []);

	const fetchProductsForOs = useCallback(async () => {
		const { productsForOs } = await getProductsForSo(cookies.jwt, id);

		if (productsForOs !== undefined) {
			setProducts(productsForOs);
			const total = productsForOs.reduce(
				(sum: any, product: any) =>
					sum + (product.totalValue * product.qtd || 0),
				0
			);
			setTotalValue(total);
		}
	}, []);

	useEffect(() => {
		fetchServiceOrder();
		fetchProductsForOs();
	}, [fetchServiceOrder, fetchProductsForOs]);

	const exportPDF = async () => {
		const pdf = new jsPDF('p', 'mm', 'a4'); // Página A4

		// Defina margens e espaçamento
		const margin = 10;
		let yPosition = 20;

		// Título do documento
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(16);
		pdf.text('Ordem de Serviço - Visualização', margin, yPosition);
		yPosition += 10;

		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(12);

		// Campos organizados
		const fields = [
			{ label: 'Cliente', value: formValues.client },
			{ label: 'Técnico Responsável', value: formValues.technician },
			{ label: 'Telefone do cliente', value: formValues.number },
			{ label: 'Data de abertura', value: formValues.date },
			{ label: 'Descrição', value: formValues.description },
			{ label: 'Defeito', value: formValues.defect },
			{ label: 'Laudo técnico', value: formValues.report },
			{ label: 'Observações', value: formValues.extras },
		];

		// Renderize os campos
		fields.forEach((field) => {
			if (yPosition > 280) {
				pdf.addPage();
				yPosition = margin;
			}
			pdf.setFont('helvetica', 'bold');
			pdf.text(`${field.label}:`, margin, yPosition);
			yPosition += 6;

			pdf.setFont('helvetica', 'normal');
			const textLines = pdf.splitTextToSize(field.value || '', 180); // Quebra de texto para largura máxima
			textLines.forEach((line: string) => {
				if (yPosition > 280) {
					pdf.addPage();
					yPosition = margin;
				}
				pdf.text(line, margin, yPosition);
				yPosition += 6;
			});
			yPosition += 4; // Espaçamento entre campos
		});

		// Adicione os produtos como uma tabela
		if (yPosition > 250) {
			pdf.addPage();
			yPosition = margin;
		}

		pdf.setFont('helvetica', 'bold');
		pdf.text('Produtos Utilizados:', margin, yPosition);
		yPosition += 10;

		// Cabeçalho da tabela
		const tableHeaders = [
			'Nome',
			'Quantidade',
			'Preço Unitário',
			'Preço Total',
		];
		const columnWidths = [40, 80, 30, 30];

		pdf.setFont('helvetica', 'bold');
		tableHeaders.forEach((header, index) => {
			pdf.text(
				header,
				margin +
					columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
				yPosition
			);
		});
		yPosition += 6;

		// Conteúdo da tabela
		pdf.setFont('helvetica', 'normal');
		products.forEach((product: any) => {
			if (yPosition > 280) {
				pdf.addPage();
				yPosition = margin;
			}
			const productData = [
				product.name,
				product.qtd.toString(),
				`R$ ${product.price}`,
				`R$ ${product.totalValue}`,
			];
			productData.forEach((data, index) => {
				pdf.text(
					data,
					margin +
						columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
					yPosition
				);
			});
			yPosition += 6;
		});

		yPosition += 10;

		// Campo para observações manuscritas
		if (yPosition > 260) {
			pdf.addPage();
			yPosition = margin;
		}
		pdf.setFont('helvetica', 'bold');
		pdf.text('Observações (escrita à mão):', margin, yPosition);
		yPosition += 10;

		pdf.setDrawColor(0); // Cor da borda
		pdf.rect(margin, yPosition, 180, 50); // Largura 180mm, Altura 50mm
		yPosition += 60;

		// Campo para assinatura do técnico responsável
		if (yPosition > 260) {
			pdf.addPage();
			yPosition = margin;
		}
		pdf.setFont('helvetica', 'bold');
		pdf.text('Assinatura do Técnico Responsável:', margin, yPosition);
		yPosition += 20;

		// Linha para assinatura
		pdf.setDrawColor(0);
		pdf.line(margin, yPosition, margin + 100, yPosition); // Linha horizontal para assinatura

		// Salve o PDF
		pdf.save('ordem-de-servico.pdf');
	};

	const getSelectClass = (): string => {
		switch (selectedOption) {
			case 'EM ANDAMENTO':
				return 'bg-green-100 text-green-400 border border-green-400';
			case 'PENDENTE':
				return 'bg-yellow-100 text-yellow-600 border border-yellow-600';
			case 'FECHADO':
				return 'bg-blue-100 text-blue-600 border border-blue-400';
			case 'CANCELADO':
				return 'bg-red-200 text-red-600 border border-red-600';
			case 'ABERTO':
				return 'bg-purple-200 text-purple-600 border-purple-600';
			default:
				return '';
		}
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main
				id="pdf-content"
				className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto"
			>
				<header className="flex justify-between mb-5">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">
							Ordens - Visualizar
						</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
				<BackPageButton route="/orders" />
				<div className="bg-white p-4 rounded-lg shadow-lg w-full">
					<div className="flex justify-between mb-4">
						<h2 className="font-bold text-lg mb-4">
							Ordem de Serviço
						</h2>
						<span
							className={`font-bold px-4 py-2 rounded-lg ${getSelectClass()}`}
						>
							{selectedOption || 'Status'}
						</span>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="col-span-8 grid grid-cols-2 gap-2">
							{[
								{
									label: 'Cliente',
									value: formValues.client,
								},
								{
									label: 'Técnico Responsável',
									value: formValues.technician,
								},
								{
									label: 'Telefone',
									value: formValues.number,
									mask: '(99) 9 9999-9999',
								},
								{
									label: 'Data de abertura',
									value: formValues.date,
								},
								{
									label: 'Descrição',
									value: formValues.description,
									isTextarea: true,
								},
								{
									label: 'Defeito',
									value: formValues.defect,
									isTextarea: true,
								},
								{
									label: 'Laudo técnico',
									value: formValues.report,
									isTextarea: true,
								},
								{
									label: 'Observações',
									value: formValues.extras,
									isTextarea: true,
								},
							].map((field, index) => (
								<div key={index}>
									<label className="block text-sm font-bold">
										{field.label}
									</label>
									{field.isTextarea ? (
										<textarea
											className="w-full p-2 border border-gray-300 rounded-lg h-52 max-h-64"
											value={field.value || ''}
											readOnly
											rows={6}
										/>
									) : (
										<ReactInputMask
											className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
											mask={field?.mask || ''}
											value={field.value || '\u00A0'}
										></ReactInputMask>
									)}
								</div>
							))}
							<div className="pt-5">
								<span className="font-semibold">
									Valor Total:
								</span>
								<span> R${totalValue}</span>
							</div>
						</div>
						<div className="col-span-4 border rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
							<Table
								icon={IconProductsBlack}
								title={
									'Produtos Relacionados a Ordem de Serviço'
								}
								columns={columns}
								data={products}
								actions={{
									showActions: false,
									actionButtonText: '',
									action: () => {
										alert('teste');
									},
									deleteAction: () => {},
								}}
							/>
						</div>
					</div>
					<div className="w-full flex items-center justify-center">
						<button
							onClick={exportPDF}
							className="bg-primary text-white rounded-lg self-center justify-self-center p-2 w-48"
						>
							Gerar PDF
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};
