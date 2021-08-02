import { Component, OnInit, ɵConsole } from '@angular/core';
import { Order } from '@models';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getOrders()
      .then((orders) => {
        this.orders = orders.data;
      })
      .finally(() => this.loading = false);
  }
}
