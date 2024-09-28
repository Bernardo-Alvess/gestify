import { Company } from "@prisma/client";
import { randomUUID } from 'node:crypto'

interface IProductProps {
    readonly id?: string;
    name: string;
    price: number;
    cost?: number | null;
    unityType: string | null;
    minQtd: number | null;
    qtd?: number | null;
    companyId: string;
}

export class Product {
    public readonly id: string;
    public name: string;
    public price: number;
    public cost?: number | null;
    public unityType?: string | null;
    public minQtd?: number | null;
    public qtd?: number | null;
    public companyId: string;



    constructor(data: IProductProps) {
        if (!data.id) {
            this.id = randomUUID()
        } else {
            this.id = data.id
        }
        this.name = data.name;
        this.price = data.price;
        this.cost = data.cost;
        this.unityType = data.unityType;
        this.minQtd = data.minQtd;
        this.qtd = data.qtd;
        this.companyId = data.companyId;

 
    }
  }