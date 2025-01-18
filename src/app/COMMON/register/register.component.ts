import { Component } from '@angular/core';
import { UserService } from '../../SERVICE/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    this.userService.register(this.firstName, this.lastName, this.email, this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Đăng ký thành công!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          if (error.status === 400) {
            console.error('Error details:', error.error);
          }
          alert('Đăng ký không thành công. Vui lòng thử lại.');
        },
      });
  }
}
