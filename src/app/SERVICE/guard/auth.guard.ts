import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Cho phép truy cập nếu đã đăng nhập
    } else {
      this.router.navigate(['/login']); // Chuyển hướng về trang login nếu chưa đăng nhập
      return false;
    }
  }
}
