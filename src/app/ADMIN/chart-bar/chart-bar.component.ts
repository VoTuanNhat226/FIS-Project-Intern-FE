import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { ProductService } from '../../SERVICE/product/product.service';
import { OrderService } from '../../SERVICE/order/order.service';
import { CategoryService } from '../../SERVICE/category/category.service';
import { UserService } from '../../SERVICE/user/user.service';

@Component({
  selector: 'app-chart-bar',
  standalone: false,
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent {
  countProducts: number = 0;
  countOrders: number = 0;
  countCategory: number = 0;
  countUser: number = 0;


  constructor(private productService: ProductService, private orderService: OrderService, private categoryService: CategoryService, private userService: UserService) {}

  ngOnInit(): void {
    this.getCountProduct();
    this.getCountOrder();
    this.getCountCategory();
    this.getCountUser();
  }

  getCountProduct() {
    this.productService.countProducts()
    .subscribe(
      (response: any) => {
        this.countProducts = response;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getCountOrder() {
    this.orderService.countOrders()
    .subscribe(
      (response: any) => {
        this.countOrders = response;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getCountCategory() {
    this.categoryService.countCategory()
    .subscribe(
      (response: any) => {
        this.countCategory = response;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getCountUser() {
    this.userService.countUsers()
    .subscribe(
      (response: any) => {
        this.countUser = response;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
