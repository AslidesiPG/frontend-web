export enum OrderType {
  DESC = 'desc',
  ASC = 'asc'
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
  /**
   * Pagination limit
   */
  page: number = 10;

  /**
   * Pagination offset
   */
  limit: number = 0;

  /**
   * OrderBy
   */
  order?: { [P in keyof T]?: OrderType };
}


/**
 * Generic pagination interface
 */
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number
  to: number;
  total: number;
}

export interface Pagination<T> {
  [x:string]: any;
  /**
   * Items included in the current listing
   */
  readonly data: T[];

  /**
   * Total number of available items
   */
  readonly meta: PaginationMeta;
}



export class Model implements BaseEntity {

  [x: string]: any;

  constructor(input?: any) {
    if (input) {
      Object.assign(this, input);
    }
  }

  static fromArray<T>(this: new () => T, data: any): Array<T> {
    if (!data) {
      return data;
    }
    return data.map((item) => {
      return Object.assign(new this(), item);
    });
  }

}


export interface BaseEntity {
  created_at?: Date;
  updated_at?: Date;
  id?: number;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T
}