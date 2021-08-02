import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { AppStorage } from './storage/app-storage';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    dataStore: {
        currency: any,
        rate: number,
    };

    _currency: BehaviorSubject<any>;
    _rate: BehaviorSubject<number>;
    rates: any = {};

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(AppStorage) private appStorage: Storage,
        private http: HttpClient,
    ) {
        this.dataStore = { currency: 'rs', rate: 1 }
        this._currency = new BehaviorSubject(this.dataStore.currency);
        this._rate = new BehaviorSubject(this.dataStore.rate);
    }

    get $currency() {
        return this._currency.asObservable();
    }

    get currency(): any {
        return this.dataStore.currency;
    }

    set currency(currency: any) {

        this.dataStore.currency = currency;
        if (currency) {
            this.appStorage.setItem('currency', this.dataStore.currency);
        } else {
            this.appStorage.removeItem('currency');
        }
        this.updateRate();
        this._currency.next(this.dataStore.currency);

    }

    get $rate() {
        return this._rate.asObservable();
    }

    get rate(): number {
        return this.dataStore.rate;
    }

    set rate(rate: number) {

        this.dataStore.rate = rate;
        if (rate) {
            this.appStorage.setItem('rate', this.dataStore.rate + '');
        } else {
            this.appStorage.removeItem('rate');
        }
        this._rate.next(this.dataStore.rate);

    }

    getCurrencyRate() {
        if (isPlatformBrowser(this.platformId)) {
            return fetch(
                `https://api.exchangeratesapi.io/latest?symbols=USD,INR&base=INR`,
                //`http://api.exchangeratesapi.io/v1/latest?access_key=3794a18aed5fa8ae4f4ed70f5568a5f2`,

            ).then(async (data: any) => {
                const currency = await data.json();
                this.rates = currency.rates;
                this.updateRate();
                return data;
            });
        } 
    }

    updateRate() {
        if (this.dataStore.currency == 'usd') {
            this.rate = this.rates.USD || 1;
        } else {
            this.rate = 1;
        }
    }

    init() {
        this.currency = this.appStorage.getItem('currency') || 'rs';
        return this.getCurrencyRate();
    }
}
