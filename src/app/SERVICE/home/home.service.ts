import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllPhone(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/1';
    return this.http.get(url);
  }

  getAllLaptop(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/2';
    return this.http.get(url);
  }

  getAllPC(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/3';
    return this.http.get(url);
  }

  getAllTV(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/4';
    return this.http.get(url);
  }

  getAllCamera(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/5';
    return this.http.get(url);
  }

  getAllLoudspeaker(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/6';
    return this.http.get(url);
  }

  getAllHeadPhone(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/7';
    return this.http.get(url);
  }

  getAllGameBox(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/8';
    return this.http.get(url);
  }

  getAllSmartHome(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/';
    return this.http.get(url);
  }

  getAllAccessory(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/category/10';
    return this.http.get(url);
  }
}
