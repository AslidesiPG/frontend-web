import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { PageService } from '../../services/page.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<any> {
  constructor(
    private pageService: PageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> {

    const slug: any = route.params.slug || route.data.slug;
    const PAGE_KEY = makeStateKey<any>('page-' + slug);
    if (this.transferState.hasKey(PAGE_KEY)) {
      const course = this.transferState.get<any>(PAGE_KEY, null);
      this.transferState.remove(PAGE_KEY);
      return of(course);
    } else {
      return this.pageService.getPage(slug)
        .pipe(
          map((resp: any) => resp.data),
          tap((page: any) => {
            if (page) {
              this.pageService.setMeta(page);
            }
            if (isPlatformServer(this.platformId)) {
              this.transferState.set(PAGE_KEY, page);
            }
          })
        );
    }
  }
}
