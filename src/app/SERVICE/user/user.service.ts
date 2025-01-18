import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlLogin = 'http://localhost:8088/api/v1/auth/login';
  private apiUrlRegister = 'http://localhost:8088/api/v1/user/register';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const userData = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrlLogin, userData, { headers });
  }

  register(firstName: string, lastName: string, email: string, username: string, password: string): Observable<any> {
    const userData = { firstName, lastName, email, username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrlRegister, userData, { headers });
  }

  getAllUser(): Observable<any> {
    const apiUrlGetAllUser = 'http://localhost:8088/api/v1/user';
    return this.http.get(apiUrlGetAllUser);
  }

  countUsers(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/user/count-user';
    return this.http.get(url);
  }
}
