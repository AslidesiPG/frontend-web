import { BaseEntity } from "./model";
import { Product } from "./product";

export interface Cart extends BaseEntity {
  cart_items?: CartItem[];
  total?: number;
  shipping_amount:number;
  coupon?: {
    coupon: any;
    discount_amount: number
  }
}

export interface CartItem extends BaseEntity {
  cart_id?: number;
  product?: Product;
  product_id?: number;
  quantity?: number;
  price?:number;
  shipping?:any;
  attributes: CartItemAttribute[];
}
export interface CartItemAttribute extends BaseEntity {
  cart_item_id?: number;
  cart_item?: CartItem;
  product_input_id?: number;
  title?: string ;
  value?: string;
}