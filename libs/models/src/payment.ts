import { Model } from './model';
import { User } from './user';


export interface Payment extends Model {
    user_id?: number,
    user?: User,
    amount?: number,
    status?: PaymentStatusEnum,
    transaction_id?: string,
    transaction_data?: any,
    data?: any,
}

export enum PaymentStatusEnum {
    SUCCESS = 'success',
    PENDING = 'pending',
    FAILD = 'faild',
}