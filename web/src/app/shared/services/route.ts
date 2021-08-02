import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class RouteUtil {

    dataStore: {
        params: any
        data: any
    };
    private _params: BehaviorSubject<any>;
    private _data: BehaviorSubject<any>;
    private paramsSubs: Subscription;
    private dataSubs: Subscription;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.dataStore = { params: {}, data: {} };
        this._params = new BehaviorSubject(this.dataStore.params);
        this._data = new BehaviorSubject(this.dataStore.data);
        this.getParams();
        this.getData();
    }


    public get params(): any {
        return this.dataStore.params;
    }

    public get $params(): Observable<any> {
        return this._params.asObservable();
    }

    // tslint:disable-next-line: adjacent-overload-signatures
    public set params(value: any) {
        this.dataStore.params = value;
        this._params.next(Object.assign({}, this.dataStore).params);
    }

    public get data(): any {
        return this.dataStore.data;
    }

    public get $data(): Observable<any> {
        return this._data.asObservable();
    }

    // tslint:disable-next-line: adjacent-overload-signatures
    public set data(value: any) {
        this.dataStore.data = value;
        this._data.next(Object.assign({}, this.dataStore).data);
    }

    getParams() {
        if (this.paramsSubs) {
            this.paramsSubs.unsubscribe();
        }
        this.paramsSubs = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
            ).subscribe(() => {
                let params: any = {};
                let route = this.activatedRoute.snapshot;
                do {
                    params = Object.assign(params, route.params);
                    route = route.firstChild;
                } while (route);
                this.params = params;
            });
    }

    getData() {
        if (this.dataSubs) {
            this.dataSubs.unsubscribe();
        }
        this.dataSubs = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
            ).subscribe(() => {
                let data: any = {};
                let route = this.activatedRoute.snapshot;
                do {
                    data = Object.assign(data, route.data);
                    route = route.firstChild;
                } while (route);
                this.data = data;
            });
    }

    getQueryParams() {
        if (this.dataSubs) {
            this.dataSubs.unsubscribe();
        }
        this.dataSubs = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
            ).subscribe(() => {
                let data: any = {};
                let route = this.activatedRoute.snapshot;
                do {
                    data = Object.assign(data, route.queryParams);
                    route = route.firstChild;
                } while (route);
                this.data = data;
            });
    }
}
