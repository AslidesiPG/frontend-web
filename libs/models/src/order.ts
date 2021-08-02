import { Address } from './address';
import { Model } from './model';
import { Payment } from './payment';
import { Product } from './product';
import { User } from './user';


export interface Order extends Model {
  address_id?: number,
  payment_id?: number,
  subtotal?: number,
  total?: number,
  shipping_amount?: number,
  wallet_amount?: number,
  status?: OrderStatusEnum,
  payment_method?: PaymentMothodEnum,
  notes?: string,
  user?: User,
  user_id?: number,
  order_item?: OrderItem,
  order_items_count?: number,
  order_items?: OrderItem[],
  payment?: Payment,
  address?: Address,
}

export enum OrderStatusEnum {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILD = 'faild',
}
export enum PaymentMothodEnum {
  COD = 'cod',
  PAYPAL = 'paypal',
}

export interface OrderItem extends Model {
  order_id?: number,
  order?: Order,
  product_id?: number,
  product?: Product,
  quantity?: number,
  amount?: number,
  deleted_at?: Date,
}
