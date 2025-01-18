import { Component } from '@angular/core';
import { UserService } from '../../SERVICE/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../SERVICE/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  usernameOrEmail: string = '';
  otp: number = 0;
  changePassword = {
    password: '',
    repeatPassword: ''
  }

  constructor(private authService: AuthService, private router: Router) {}

  // Xử lý khi người dùng gửi email
  onSubmitEmail() {
    this.authService.forgotPassword(this.usernameOrEmail).subscribe({
      next: (response) => {
        alert('Email đã được gửi, vui lòng kiểm tra.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Email không hợp lệ. Vui lòng thử lại.');
      },
    });
  }
}
