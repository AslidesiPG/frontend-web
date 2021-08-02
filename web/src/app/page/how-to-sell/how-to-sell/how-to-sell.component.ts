import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fileUrl } from '@utils';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RequestCallBackComponent } from 'src/app/shared/components/request-call-back/request-call-back/request-call-back.component';
import { AppInitService } from 'src/app/shared/services/app-init.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@UntilDestroy()
@Component({
  selector: 'app-how-to-sell',
  templateUrl: './how-to-sell.component.html',
  styleUrls: ['./how-to-sell.component.scss']
})
export class HowToSellComponent implements OnInit, OnDestroy {
  page: any;
  faqs: any = {};
  settings: any = {};
  fileUrl = fileUrl

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private commonService: CommonService,
    private appInitService: AppInitService,
    private helperService: HelperService,
    private matDialog: MatDialog,
    private seo: SeoService,
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 2
      },
      450: {
        items: 3
      },
      680: {
        items: 5
      },
      850: {
        items: 6
      },
      980: {
        items: 6
      },
      1200: {
        items: 8
      }
    },
    nav: false
  };

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
    this.commonService.vendorFaq().then((resp: any) => {
      this.faqs = resp.data;
    });
    
  }



  ngOnDestroy(): void {

  }


  savePhone(value) {
    this.commonService.callRequest({ phone: value }).then((resp) => {
      this.helperService.successMessage(resp);
    }).catch((error) => {
      this.helperService.errorMessage(error.error);
    });
  }
  addPhoneNumber($event) {
    $event.stopPropagation();
    this.matDialog.open(RequestCallBackComponent)
  }

}
