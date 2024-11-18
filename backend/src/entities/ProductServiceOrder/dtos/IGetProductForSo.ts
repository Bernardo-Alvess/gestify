// export interface IProductServiceOrderProps {
//     id?: string;
//     productId: string;
//     serviceOrderId: string;
//     qtd: number
// }

// interface IProductProps {
//     readonly id?: string;
//     name: string;
//     price: number;
//     cost?: number | null;
//     unityType: string | null;
//     minQtd: number | null;
//     qtd?: number | null;
//     companyId: string;
// }

export interface IGetProductForSo {
    id: string,
    productId: string,
    serviceOrderId: string;
    name: string;
    price: number;
    cost: number;
    qtd: number;
    unityType: string;
}