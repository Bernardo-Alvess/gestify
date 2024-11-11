interface IProductSo {
    productId: string | undefined;
    qtd: number | undefined;
    name: string | undefined;
    cost: number | undefined;
    price: number | undefined;
    totalCost: number | undefined
}

const productSo: IProductSo[] = [];
let counter = 0

const addProductToSo = (product: IProductSo) => {
    productSo.push(product)
    counter++;
}

const cleanProductSo = () => {
    productSo.length = 0
}

export { addProductToSo, cleanProductSo, productSo }