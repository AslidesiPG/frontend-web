import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fileUrl } from '@utils';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PageService } from 'src/app/shared/services/page.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit, OnDestroy {
  form: FormGroup;
  page: any;
  contactMessage: any = null;
  fileUrl = fileUrl;
  httpError: any;
  siteKey = environment.reCaptchaSiteKey;
  isBrowser: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pageService: PageService,
    private helperService: HelperService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  };

  vendorOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      500: {
        items: 3
      },
      700: {
        items: 4
      },
    },
    nav: true
  };

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
      recaptcha: ['', Validators.required]
    });

    /*     this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
          console.log('This is your token: ', token);
        }, {
          useGlobalDomain: false
        }); */

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
  }


  handleSuccess(event) {
    console.log(event);
  }


  send() {
    if (this.form.valid) {
      this.pageService.sendContactUs(this.form.value).then((resp: any) => {
        this.helperService.successMessage(resp)
      }).catch((error) => {
        this.httpError = error.error;
      });
    }
  }

  ngOnDestroy(): void { }

}
