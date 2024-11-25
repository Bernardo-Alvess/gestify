import { randomUUID } from "node:crypto";

export interface IProductServiceOrderProps {
  id?: string;
  productId: string;
  serviceOrderId: string;
  qtd: number
}

export class ProductServiceOrder {
  public readonly id: string;
  public productId: string;
  public serviceOrderId: string;
  public qtd: number

  constructor(props: IProductServiceOrderProps) {
    if (props.id) {
      this.id = props.id;
    } else {
      this.id = randomUUID()
    }
    this.productId = props.productId;
    this.serviceOrderId = props.serviceOrderId;
    this.qtd = props.qtd;
  }
}