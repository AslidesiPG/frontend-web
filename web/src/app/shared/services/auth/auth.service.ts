import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { AppStorage } from '../storage/app-storage';
import { isEmpty, toFormData } from '@utils';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    dataStore: {
        token: string
        userType: string
        user: any
        isLoggedIn: boolean
    };

    private _token: BehaviorSubject<string>;
    private _user: BehaviorSubject<any>;
    private _isLoggedIn: BehaviorSubject<any>;
    $logout: Subject<any> = new Subject();
    registerSuccess: any = null;

    constructor(
        @Inject(AppStorage) private appStorage: Storage,
        private http: HttpClient,
        private userService: UserService,
        private cartService: CartService,
        private router: Router,
    ) {
        this.dataStore = {
            token: null,
            user: null,
            isLoggedIn: false,
            userType: 'patient'
        };
        this._token = new BehaviorSubject(this.dataStore.token);
        this._user = new BehaviorSubject(this.dataStore.user);
        this._isLoggedIn = new BehaviorSubject(this.dataStore.isLoggedIn);
        this.init();
    }

    public get $isLoggedIn(): Observable<any> {
        return this._isLoggedIn.asObservable();
    }

    public get isLoggedIn(): boolean {
        return this.dataStore.isLoggedIn;
    }

    public set isLoggedIn(value: boolean) {
        this.dataStore.isLoggedIn = value;
        this._isLoggedIn.next(value);
    }

    public get phoneNumber() {
        try {
            return JSON.parse(this.appStorage.getItem('phone'));
        } catch (error) {
            return null;
        }
    }

    public set phoneNumber(value: any) {
        if (value) {
            this.appStorage.setItem('phone', JSON.stringify(value));
        } else {
            this.appStorage.removeItem('phone');
        }
    }

    public get $token(): Observable<any> {
        return this._token.asObservable();
    }

    public get token(): any {
        return this.dataStore.token;
    }

    public set token(value: any) {
        this.dataStore.token = value;
        if (value) {
            this.appStorage.setItem('token', this.dataStore.token);
        } else {
            this.appStorage.removeItem('token');
        }
        this._token.next(this.dataStore.token);
    }

    public get user(): any {
        return this.dataStore.user;
    }

    public get $user(): Observable<any> {
        return this._user.asObservable();
    }

    public set user(value: any) {
        this.dataStore.user = value;
        if (value) {
            this.appStorage.setItem('user', JSON.stringify(this.dataStore.user));
        } else {
            this.appStorage.removeItem('user');
        }
        this._user.next(this.dataStore.user);
    }


    sendOtp(request: any) {
        return this.http.post('auth/otp', request).toPromise();
    }
    resendOtp(request: any) {
        return this.http.post('auth/resend', request).toPromise();
    }

    verifyOtp(request) {
        return this.http.post('auth/otp/verify', request)
            .toPromise()
            .then((data: any) => {
                if (data.user && data.token) {
                    this.user = data.user;
                    this.token = data.token;
                    this.isLoggedIn = true;
                }
                return data;
            }).catch((error) => {
                this.isLoggedIn = false;
                this.token = null;
                this.user = null;
                throw error;
            });
    }


    vendorLogin(request: any) {
        return this.http.post('auth/vendor-login', request).toPromise();
    }

    createProfile(request: any, login = true) {
        return this.http.post('auth/create-profile', toFormData(request))
            .toPromise()
            .then((user: any) => {
                this.user = user;
                this.isLoggedIn = true;
                return user;
            }).catch((error) => {
                throw error;
            });
    }

    vendorRegistration(request: any, login = true) {
        return this.http.post('auth/vendor-registration', toFormData(request)).toPromise();
    }

    forgotPassword(request: any) {
        return this.http.post('auth/forget-password', request).toPromise();
    }

    setPassword(request: any) {
        return this.http.post('auth/set-password', request).toPromise();
    }

    logout() {
        return new Promise((resolve) => {
            this.appStorage.removeItem('user');
            this.appStorage.removeItem('token');
            this.isLoggedIn = false;
            this.token = null;
            this.user = null;
            this.cartService.clearCart();
            this.$logout.next();
            resolve(true);
        });
    }

    setAuth(token) {
        return new Promise((resolve, reject) => {
            this.token = token;
            this.isLoggedIn = true;
            this.userService.getUser().then((res: any) => {
                this.user = res;
                resolve(res.user);
                this.router.navigate(['/']);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async init() {
        try {
            this.token = this.appStorage.getItem('token');
            this.user = JSON.parse(this.appStorage.getItem('user'));
            if (this.token) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        } catch (error) {
        }
    }
}
