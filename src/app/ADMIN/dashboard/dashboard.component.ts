import { Component } from '@angular/core';
import { ProductService } from '../../SERVICE/product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../SERVICE/category/category.service';
import { AuthService } from '../../SERVICE/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  activeComponent: string = 'statistical'; // Mặc định là 'product'
  userInfo: any;

  ngOnInit(): void {
    console.log("User: ", this.userInfo)
  }

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.userInfo = user;
    });
  }

  // Phương thức để thay đổi component hiển thị
  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
