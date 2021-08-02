import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable()
export class CookieStorage implements Storage {
    [index: number]: string;
    [key: string]: any;
    length: number;
    
    type = 'cookies';

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: InjectionToken<any>
    ) {
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        this.type = environment.storage;
    }


    check(name: string): boolean {
        if (this.type === 'local') {
            return !!(localStorage.getItem(name));
        }

        if (!this.documentIsAccessible) {
            return false;
        }

        name = encodeURIComponent(name);

        const regExp: RegExp = this.getCookieRegExp(name);
        const exists: boolean = regExp.test(this.document.cookie);

        return exists;
    }

    get(name: string): string {
        if (this.type === 'local') {
            return localStorage.getItem(name);
        }

        if (this.documentIsAccessible && this.check(name)) {
            name = encodeURIComponent(name);

            const regExp: RegExp = this.getCookieRegExp(name);
            const result: RegExpExecArray = regExp.exec(this.document.cookie);

            return decodeURIComponent(result[1]);
        } else {
            return '';
        }
    }

    getAll(): {} {
        if (this.type === 'local') {
            return localStorage.get();
        }

        if (!this.documentIsAccessible) {
            return {};
        }

        const cookies: {} = {};
        const document: any = this.document;

        if (document.cookie && document.cookie !== '') {
            const split: Array<string> = document.cookie.split(';');

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < split.length; i += 1) {
                const currentCookie: Array<string> = split[i].split('=');

                currentCookie[0] = currentCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
            }
        }

        return cookies;
    }

    set(
        name: string,
        value: string,
        expires?: number | Date,
        path?: string,
        domain?: string,
        secure?: boolean,
        sameSite?: 'Lax' | 'Strict'
    ): void {

        if (this.type === 'local') {
            return localStorage.setItem(name, value);
        }


        if (!this.documentIsAccessible) {
            return;
        }
        let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            } else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieString += 'path=' + path + ';';
        }
        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieString += 'secure;';
        }
        if (sameSite) {
            cookieString += 'sameSite=' + sameSite + ';';
        }
        this.document.cookie = cookieString;
    }

    delete(name: string, path?: string, domain?: string): void {
        if (this.type === 'local') {
            return localStorage.removeItem(name);
        }

        if (!this.documentIsAccessible) {
            return;
        }
        this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
    }

    deleteAll(path?: string, domain?: string): void {
        if (this.type === 'local') {
            return localStorage.clear();
        }

        if (!this.documentIsAccessible) {
            return;
        }

        const cookies: any = this.getAll();

        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                this.delete(cookieName, path, domain);
            }
        }
    }

    private getCookieRegExp(name: string): RegExp {
        const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');
        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    }

    public clear(): void {
        this.deleteAll();
    }

    public getItem(key: string): string {
        return this.get(key);
    }

    public key(index: number): string {
        return this.getAll().propertyIsEnumerable[index];
    }

    public removeItem(key: string): void {
        this.delete(key);
    }

    public setItem(key: string, data: string, expiredDate?: any): void {
        this.set(key, data);
    }
}
