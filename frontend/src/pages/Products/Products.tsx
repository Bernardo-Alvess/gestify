import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconProductBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { getProducts } from '../../http/get-products';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../http/delete-product';
import { toast } from 'sonner';


export const Products = () => {
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('pt-BR');
    const [cookies] = useCookies(['jwt']);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const column_table_2 = [
        'Código',
        'Nome',
        'Preço',
        'Custo',
        'Tipo',
        'Quantidade Mínima',
        'Quantidade',
        'Código da Empresa',
    ];

    const add = () => {
        navigate('/create-product');
    };

    const fetchProducts = useCallback(async () => {
        const data = await getProducts(cookies.jwt);
        setProducts(data);
        setFilteredProducts(data);
    }, [cookies.jwt]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredProducts(products);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = products.filter((product: any) =>
            product.name.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(results);
    };

    const deleteProductAction = async (id: string) => {
        const result = await deleteProduct(cookies.jwt, id);
        if (result.error) {
            toast.error(`Erro: ${result.error ? result.error.message || result.error : "Erro desconhecido"}`);
        } else {
            toast.success(`Sucesso: ${result.message}`);
            fetchProducts();
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-10 h-screen">
                <header className="flex justify-between">
                    <div className="pt-16 md:pt-16 lg:pt-0">
                        <h1 className="text-2xl font-bold">Produtos</h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <SearchBox placeholder="Pesquisar nome do produto" onSearch={handleSearch} />
                    <TopNav />
                </header>
                <div className="grid grid-cols-12 max-h-[80%] overflow-y-scroll">
                    <div className="col-span-12">
                        <Table
                            icon={IconProductBlack}
                            title="Produtos em estoque"
                            columns={column_table_2}
                            data={filteredProducts}
                            actions={{
                                showActions: true,
                                actionButtonText: 'Adicionar Produto',
                                action: add,
                                deleteAction: deleteProductAction,
                            }}
                            viewPage="/view-product"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};
