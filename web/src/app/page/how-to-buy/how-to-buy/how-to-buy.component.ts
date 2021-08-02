import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fileUrl } from '@utils';
import { AppInitService } from 'src/app/shared/services/app-init.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@UntilDestroy()
@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements OnInit, OnDestroy {
  page: any;
  faqs: any = {};
  settings: any = {};
  fileUrl = fileUrl
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private commonService: CommonService,
    private settingsService: SettingsService,
    private appInitService: AppInitService,
    private seo: SeoService
  ) { }
  

  ngOnInit(): void {

    this.settings = this.appInitService.settings;

    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ page }) => {
      if (!page) {
        this.router.navigate(['404']);
      } else {
        this.seo.setTitle(page?.extras?.meta_title);
        this.seo.setDescription(page?.extras?.meta_description);
        this.seo.setKeywords(page?.extras?.meta_keywords);
        this.page = page;
      }
    });
    this.commonService.faqs().then((resp: any) => {
      this.faqs = resp.data;
    });

  }

  ngOnDestroy(): void {}
  
}
