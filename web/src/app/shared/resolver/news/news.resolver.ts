import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver {

  constructor(
    private newsService: NewsService,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState
  ) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> {

    const slug: any = route.params.slug;
    const PAGE_KEY = makeStateKey<any>('news-' + slug);
    if (this.transferState.hasKey(PAGE_KEY)) {
      const course = this.transferState.get<any>(PAGE_KEY, null);
      this.transferState.remove(PAGE_KEY);
      return of(course);
    } else {
      return this.newsService.getNews(slug)
        .pipe(
          map((resp: any) => resp.data),
          tap((resp: any) => {
            if (resp){
              this.newsService.setMeta(resp);
            }
            if (isPlatformServer(this.platformId)) {
              this.transferState.set(PAGE_KEY, resp);
            }
          })
        );
    }
  }
}
