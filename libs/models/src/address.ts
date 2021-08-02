import { Model } from './model';

export interface Address extends Model {
  user_id: number,
  first_name: string,
  last_name: string,
  email: string,
  country_id: number,
  state_id: number,
  city_id: number,
  addressline1: string,
  addressline2: string,
  zip_code: number,
  phone: number,
  phone_country_code: number
}