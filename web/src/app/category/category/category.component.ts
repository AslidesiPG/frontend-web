import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductService } from 'src/app/shared/services/product.service';

@UntilDestroy()
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Category[];
  category: Category;
  title: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.getCategories(params.slug);
      });
  }

  getCategories(slug?: string) {
    const request: any = {
      with: ['children', 'parent']
    };
    this.categories = [];
    this.category = null;
    if (slug) {
      request.slug = slug;
      this.productService.getCategory(slug, request).then((resp) => {
        this.category = resp.data;
        this.categories = resp.data.children;
        this.title = this.category.name;
      });
    }else{

      this.productService.getCategories(request).then((resp) => {
        this.categories = resp.data;
        this.title = 'Categories';
      });
    }
  }

  ngOnDestroy(): void {
  }
}
