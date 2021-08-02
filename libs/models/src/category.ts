import { Model } from './model';
import { Product } from './product';

export interface Category extends Model {
  name?: string;
  slug?: string;
  deleted_at?: Date;
  depth?: number;
  description?: string;
  image?: string;
  lft?: number;
  parent?: Category;
  children?: Category[];
  products?: Product[];
  parent_id?: number;
  rgt?: number;
}
