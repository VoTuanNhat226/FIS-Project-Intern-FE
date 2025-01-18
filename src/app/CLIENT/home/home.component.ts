import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../SERVICE/auth/auth.service';
import { CategoryService } from '../../SERVICE/category/category.service';
import { ProductService } from '../../SERVICE/product/product.service';
import { HomeService } from '../../SERVICE/home/home.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userInfo: any;
  isLogin = false;

  searchText: String = '';
  phones: any[] = [];
  laptops: any[] = [];
  PCs: any[] = [];
  categories: any[] = [];


  constructor(private router: Router, private authService: AuthService, private productService: ProductService, private categoryService: CategoryService, private homeService: HomeService) {
    this.authService.user$.subscribe((user) => {
      this.userInfo = user;
    });
  }

  ngOnInit(): void {
    this.getAllPhone();
    this.getAllLaptop()
    // this.getAllCategory();
    this.getAllPC();
    console.log("User: ", this.userInfo)
    if(this.userInfo!= null) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }

  getAllPhone() {
    this.homeService.getAllPhone()
      .subscribe(
        (response: any) => {
          this.phones = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  getAllLaptop() {
    this.homeService.getAllLaptop()
      .subscribe(
        (response: any) => {
          this.laptops = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

    getAllPC() {
    this.homeService.getAllPC()
      .subscribe(
        (response: any) => {
          this.PCs = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }



  getAllCategory() {
    this.categoryService.getAllCategory()
      .subscribe(
        (response: any) => {
          this.categories = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  handleSearch(): void {

  }

  toLogin(): void {
        // Lưu lại URL hiện tại (Home)
        const currentUrl = this.router.url;
        localStorage.setItem('redirectUrl', currentUrl);
        // Chuyển hướng đến trang login
        this.router.navigate(['/login']);
  }

  toLogout(): void {
    this.authService.logout();
  }
}
