import { Component } from '@angular/core';
import { UserService } from '../../SERVICE/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../SERVICE/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  // onLogin() {
  //   this.userService.login(this.username, this.password)
  //     .subscribe(
  //       (response: any) => {
  //         // console.log('Login success', response);
  //         const token = response.access_token;
  //         this.authService.login(token); // Lưu token và cập nhật thông tin người dùng
  //         this.router.navigate(['/dashboard']);
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //       }
  //     );
  // }
  onLogin() {
    this.userService.login(this.username, this.password)
      .subscribe(
        (response: any) => {
          const token = response.access_token;
          this.authService.login(token); // AuthService sẽ xử lý điều hướng theo vai trò
        },
        (error) => {
          console.error('Đăng nhập thất bại', error);
        }
      );
  }

  onLogout() {

  }
}
