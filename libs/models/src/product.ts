import { Brand } from './brand';
import { Category } from './category';
import { Model } from './model';
import { User } from './user';

export interface Product extends Model {
  [x:string] : any,
  name?: string;
  slug?: string;
  address?: string;
  brand_id?: number;
  brand?: Brand;
  category?: Category;
  category_id?: number;
  current_stock?: number;
  shipping_free?: boolean;
  deleted_at?: Date;
  description?: string;
  discount?: number;
  discount_type?: 'flat' | 'percentage';
  featured?: boolean;
  images?: ProductImge[];
  image?: ProductImge;
  product_attributes?: any[];
  is_in_wishlist?: 0
  latitude?: string;
  longitude?: string;
  options?: any;
  parent_id?: number;
  price?: number;
  quantity?: number;
  sale_price?: number;
  selling_price?: number;
  shipping_cost?: number;
  sort_description?: string;
  status?: ProductEnum;
  unit?: any;
  user?: User;
  user_id?: number;
  cart_qty?: number;
  '1_star_rating'?: number;
  '2_star_rating'?: number;
  '3_star_rating'?: number;
  '4_star_rating'?: number;
  '5_star_rating'?: number;
}

export interface ProductImge extends Model {
  image?: string;
  product_id?: number;
  title?: string;
  image_urls?: {
    xs: string,
    sm: string,
    md: string,
    full: string,
  };
}

export enum ProductEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}
