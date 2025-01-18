import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    const apiUrlGetAllCategory = 'http://localhost:8088/api/v1/category';
    return this.http.get(apiUrlGetAllCategory);
  }

  countCategory(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/category/count-category';
    return this.http.get(url);
  }

  updateCategory(category: any): Observable<any> {
    const url = `http://localhost:8088/api/v1/category/${category.id}`;
    return this.http.put(url, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    const url = `http://localhost:8088/api/v1/category/${categoryId}`;
    return this.http.delete<void>(url);
  }
}
