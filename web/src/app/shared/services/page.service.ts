import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { getTitle } from '@utils';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(
    private http: HttpClient,
    private titleService: Title,
    private metaService: Meta
  ) {

  }
  getPage(slug: any) {
    return this.http.get(`page/${slug}`);
  }

  sendContactUs(request: any) {
    return this.http.post('contact-us', request).toPromise();
  }
  contactForPrice(request: any) {
    return this.http.post('contact-for-price', request).toPromise();
  }

  setMeta(page: any, type = 'page') {
    let keywords = '';
    let description = '';
    let title = '';
    if (type === 'page') {
      keywords = page.extras.meta_keywords;
      description = page.extras.meta_description;
      title = page.extras.meta_title;
    } else if (type === 'product') {
      keywords = page.meta_keywords;
      description = page.meta_description;
      title = page.meta_title || page.name;
    }
    this.titleService.setTitle(getTitle(page.title));
    this.metaService.addTags([
      { name: 'keywords', content: keywords },
      { name: 'description', content: description },
      { name: 'title', content: title }
    ]);
  }
}
