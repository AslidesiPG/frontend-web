import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { CartService } from './cart.service';
import { CommonService } from './common.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    settings: any = {};

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private cartService: CartService,
        private commonService: CommonService,
        private settingsService: SettingsService,
    ) { }

    async init() {
        await this.commonService.getSettings().then((settings) => {
            this.settings = settings;
        });
        await this.settingsService.init();

        if (this.authService.isLoggedIn) {
            await this.userService.getUser().then((data: any) => {
                this.authService.user = data;
            });
            await this.cartService.init();
        }
        
    }

}
