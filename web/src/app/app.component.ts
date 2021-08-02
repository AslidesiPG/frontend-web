import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/services/auth/auth.service';
import { CartService } from './shared/services/cart.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Aslidesi';

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId
  ) {


  }



  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        if (params.token) {
          this.authService.setAuth(params.token);
        }
      });

    this.authService
      .$isLoggedIn
      .pipe(untilDestroyed(this))
      .subscribe((isLogin) => {
        if (isLogin) {
          this.cartService.init();
        }
      });
    /*  if (this.activatedRoute.queryParams.token) {
       this.authService.setAuth(this.activatedRoute.queryParams.token);
     } */
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  ngOnDestroy(): void { }
}
