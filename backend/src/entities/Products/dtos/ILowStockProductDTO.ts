export interface ILowStockProductDTO {
    id: string;
    name: string;
    price: number;
    cost: number | null;
    unityType: string | null;
    qtd: number | null;
}