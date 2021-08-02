export class DatatableRequest {
    page = 1;
    limit = 10;
    filter: any = {};
    order: any = '';
    // tslint:disable-next-line: variable-name
    order_by: any = '';
}

export interface DatatableInterface {
    request: DatatableRequest;
}
