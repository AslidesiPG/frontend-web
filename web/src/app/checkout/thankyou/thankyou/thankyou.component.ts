import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@models';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  order: Order = {};
  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getOrder(params.id);
    });
  }

  getOrder(id): void {
    this.loading = true;
    this.orderService.getOrder(id).then((order) => {
      this.order = order;
      console.log(order);
    }).finally(() => this.loading = false);
  }

}
