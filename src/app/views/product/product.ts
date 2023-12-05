export interface Product {
    id:string
    description: string,
    selling_price: number,
    purchase_price: number,
    code: string,
    active:boolean,
    allows_sale_without_stock: boolean,
    current_quantity: number,
    minimum_quantity: number
  
  }
  
  