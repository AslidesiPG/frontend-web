import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AppStorage } from './storage/app-storage';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    isBrowser: boolean;

    constructor(
        private authService: AuthService,
        @Inject(AppStorage) private appStorage: Storage,
        @Inject(PLATFORM_ID)
        platform: any
    ) {
        this.isBrowser = isPlatformBrowser(platform);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.appStorage.getItem('token');
        let options: any = {
            url: req.url.startsWith('http') ? req.url : environment.apiUrl + '/api/' + req.url
        };
        if (token !== undefined && token !== null && token !== '' && token !== 'null') {
            options = {
                ...options,
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            };
        }
        const reqClone = req.clone(options);
        return next.handle(reqClone)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.authService.logout();
                    } else {
                        return throwError(error);
                    }
                })
            );
    }
}
