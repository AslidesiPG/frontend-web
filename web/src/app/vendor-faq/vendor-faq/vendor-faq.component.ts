import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-vendor-faq',
  templateUrl: './vendor-faq.component.html',
  styleUrls: ['./vendor-faq.component.scss']
})
export class VendorFaqComponent implements OnInit, OnDestroy {
  vendorFaqs: any = {};
  constructor(
    private commonService: CommonService,
  ) { }


  ngOnInit(): void {
    this.commonService.vendorFaq().then((resp: any) => {
      this.vendorFaqs = resp.data;
    });
  }

  ngOnDestroy(): void { }

}
