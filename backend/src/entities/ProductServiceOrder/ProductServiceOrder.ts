export interface IProductServiceOrderProps {
    id?: string;
    productId?: string | null;
    serviceOrderId?: string | null;
  }
  
  export class ProductServiceOrder {
    public readonly id?: string;
    public productId?: string | null;
    public serviceOrderId?: string | null;
  
    constructor(props: IProductServiceOrderProps) {
      this.id = props.id;
      this.productId = props.productId;
      this.serviceOrderId = props.serviceOrderId;
    }
  }