import { Component, OnInit, OnDestroy } from '@angular/core';
import { fileUrl } from '@utils';
import { NewsService } from '../../../shared/services/news.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  page: any;
  news: any;
  hasMoreNews = false;
  request: any = {
    page: 1,
    limit: 10
  };

  fileUrl = fileUrl;

  constructor(
    private newsService: NewsService,
  ) {
  }

  ngOnInit(): void {
    this.getNews();
  }

   loadMore() {
    this.request.page++;
    this.getNews();
  } 

  getNews() {
    this.newsService.getAllNews(this.request).then((res: any) => {
      this.news = res.data;
      console.log(this.news);
      this.hasMoreNews = (res.last_page <= res.current_page);
    });
  }

  ngOnDestroy(): void {
  }
}
