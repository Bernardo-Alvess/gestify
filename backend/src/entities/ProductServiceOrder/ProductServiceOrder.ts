export interface IProductServiceOrderProps {
    id?: string;
  productId: string;
  serviceOrderId: string;
  }
  
  export class ProductServiceOrder {
    public readonly id?: string;
    public productId: string;
    public serviceOrderId: string;
  
    constructor(props: IProductServiceOrderProps) {
      this.id = props.id;
      this.productId = props.productId;
      this.serviceOrderId = props.serviceOrderId;
    }
  }