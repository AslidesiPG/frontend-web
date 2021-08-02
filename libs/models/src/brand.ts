import { Model } from './model';
import { Product } from './product';

export interface Brand extends Model {
  name?: string;
  image?: string;
  slug?: string;
}
