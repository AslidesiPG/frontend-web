import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { getTitle, objectToParams, toParams } from '@utils';
// import { objectToParams, getTitle } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private metaService: Meta
  ) { }

  getAllNews(request: any = {}) {
    // return this.http.get(`news?` + objectToParams(request)).toPromise();
    return this.http.get(`news`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getNews(slug) {
    return this.http.get(`news/${slug}`);
  }

  setMeta(news: any) {
    this.titleService.setTitle(getTitle(news.title));
    this.metaService.addTags([
      { name: 'keywords', content: news.meta_keywords },
      { name: 'description', content: news.meta_description },
      { name: 'title', content: news.meta_title }
    ]);
  }
}
