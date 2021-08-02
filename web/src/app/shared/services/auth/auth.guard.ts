import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { RouteUtil } from '../route';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (route.queryParams.token) {
            this.authService.setAuth(route.queryParams.token);
        }

        let url = route.data.noAuthUrl ? route.data.noAuthUrl : 'login'
        return await new Promise((resolve, reject) => {
            this.authService.$isLoggedIn.subscribe((login) => {
                if (login) {
                    resolve(true);
                } else {
                    reject();
                }
            });
        }).then(() => true).catch(() => {
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, login: true } });
            // return false;

            this.router.navigate(['/', url], { queryParams: { returnUrl: state.url, login: true,  } });
            return false;
        });
    }
}
