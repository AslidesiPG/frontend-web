import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PaginationMeta } from '../../../../../../libs/models/src/model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlists = [];
  request = {
    limit: 12,
    page: 1,
  };
  hasMorePage: boolean;
  productLoading: boolean;
  pageMeta: PaginationMeta;
  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit(): void {
    this.getWishlists();

  }
  getWishlists() {
    this.productService.getWishlist(this.request).then((req) => {
      this.wishlists = req.data;
      this.pageMeta = req.meta;
    });
  }

  loadeMoreProducts(event: any) {
    this.request.limit = event.pageSize;
    this.request.page = event.pageIndex + 1;
    this.getWishlists();
  }


}
