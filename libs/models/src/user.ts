import { Model } from './model';

export interface User extends Model {
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    photo?: string;
    status?: UserStatusEnum;
}

export enum UserStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}