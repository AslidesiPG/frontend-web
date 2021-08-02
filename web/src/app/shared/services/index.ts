import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { AppInitService } from './app-init.service';
import { AppStorage } from './storage/app-storage';
import { CookieStorage } from './storage/cookie.storage';

export const Services = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  { provide: 'REQUEST', useValue: null },
  { provide: AppStorage, useClass: CookieStorage },
  {
    provide: APP_INITIALIZER,
    useFactory: (appInitService: AppInitService) => {
      return async () => {
        await appInitService.init();
      };
    },
    deps: [AppInitService],
    multi: true,
  },
];
