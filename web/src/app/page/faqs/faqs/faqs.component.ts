import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  faqs: any = {}
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonService.faqs().then((resp: any) => {
      this.faqs = resp.data;
    });
  }

}
