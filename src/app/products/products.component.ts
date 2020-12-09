import { Component } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
product$;
  constructor(productService: ProductService) {
    this.product$ = productService.getAll()
  }



}
