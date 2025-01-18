import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any> {
    const apiUrlGetAllProduct = 'http://localhost:8088/api/v1/product';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(apiUrlGetAllProduct);
  }

  deleteProduct(productId: number): Observable<void> {
    const apiUrlDeleteProduct = `http://localhost:8088/api/v1/product/${productId}`;
    return this.http.delete<void>(apiUrlDeleteProduct);
  }

  updateProduct(product: any): Observable<any> {
    const url = `http://localhost:8088/api/v1/product/${product.id}`;
    return this.http.put(url, product);
  }

  createProduct(newProduct: any): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/product', newProduct);
  }

  exportReport(format: string): Observable<any> {
    const url = `http://localhost:8088/api/v1/product/report/${format}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  importExcel(file: File, entityName: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityName', entityName);
    const url = 'http://localhost:8088/api/v1/import/import-excel'
    return this.http.post<string>(url, formData, {
      headers: new HttpHeaders({
        // Add thêm headers nếu cần, ví dụ: 'Authorization': 'Bearer <token>'
      }),
      responseType: 'text' as 'json',
    });
  }

  searchProduct(name: string): Observable<any> {
    const url = `http://localhost:8088/api/v1/product/search/${name}`;
    return this.http.get(url);
  }

  countProducts(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/product/count-product';
    return this.http.get(url);
  }
}
