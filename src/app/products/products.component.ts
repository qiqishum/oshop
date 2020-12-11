import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import 'rxjs/add/operator/switchMap';
import {switchMap} from 'rxjs/operator/switchMap';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    productService
      .getAll()
      .switchMap(products => {
        console.log(`products in switchMap ${products}`);
        this.products = products;
        console.log(`this.products in switchMap ${this.products}`);
        return route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products;
      });
    this.categories$ = categoryService.getAll();
  }
}
