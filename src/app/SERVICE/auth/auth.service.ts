import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = 'token';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.updateUserFromToken();
  }

  forgotPassword(usernameOrEmail: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = 'http://localhost:8088/api/v1/auth/forgot-password';
    return this.http.post(url, { usernameOrEmail }, { headers, responseType: 'text' as 'json' });
  }

  // Đăng nhập (lưu token và cập nhật trạng thái người dùng)
  login(token: string): void {
    localStorage.setItem(this.authToken, token);
    this.updateUserFromToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  private updateUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const user = {
        username: decodedToken?.preferred_username,
        roles: decodedToken?.realm_access?.roles,
        // Thêm các thông tin khác từ token nếu cần
      };
      this.userSubject.next(user); // Cập nhật thông tin người dùng vào userSubject

      const roles = decodedToken.realm_access?.roles || [];
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (roles.includes('CUSTOMER') && redirectUrl) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Lấy phần payload của JWT
    return JSON.parse(atob(payload)); // Giải mã và parse nó
  }

  // Kiểm tra người dùng đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwt_decode.jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp && decoded.exp > currentTime;
      } catch {
        return false;
      }
    }
    return false;
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem(this.authToken);
    this.userSubject.next(null); // Xóa thông tin người dùng
    this.router.navigate(['/login']);
  }

  logoutClient(): void {
    localStorage.removeItem(this.authToken);
    this.userSubject.next(null); // Xóa thông tin người dùng
  }

  // Lấy thông tin người dùng
  getUser(): Observable<any> {
    return this.user$; // Lắng nghe thông tin người dùng qua userSubject
  }
}
