import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Order, OrderItem } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddEditAddressComponent } from 'src/app/shared/components/add-edit-address/add-edit-address/add-edit-address.component';
import { GiveRatingComponent } from 'src/app/shared/components/give-rating/give-rating/give-rating.component';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderId: number;
  address: any = {};
  total = 0;
  items = 0;
  deliverDate: any;
  orderItems: OrderItem;
  order: any;
  wishlists = [];
  productLoading: boolean;
  environment = environment;
  rating: any;
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private matDialog: MatDialog,
  ) { }

  occasionOptions: OwlOptions = {
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
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      750: {
        items: 3
      },
      1000: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: false
  };


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        this.orderId = params.id;
      });


    this.GetOrderItem();

    this.productService.getWishlist({ limit: 10 }).then((req) => {
      this.wishlists = req.data;
    });
  }

  GetOrderItem() {
    this.orderService.getOrder(this.orderId).then((order: any) => {
      this.orderItems = order.order_items;
      this.order = order;
      this.address = order.address;
    });
  }


  addEditAddress($event, type, address?: any) {
    $event.stopPropagation();
    this.matDialog.open(AddEditAddressComponent, {
      data: {
        item: address,
        type,
        address_type: 'order',
      }
    }).afterClosed()
      .subscribe((res: any) => {
        if (res.order_address) {
          this.address = res.order_address;
        }
      });
  }
  saveRating(rating) {
    this.matDialog.open(GiveRatingComponent, {
      data: { item: rating }
    }).afterClosed()
      .subscribe(() => {
        this.GetOrderItem();
      });



  }

  ngOnDestroy(): void { }
}
