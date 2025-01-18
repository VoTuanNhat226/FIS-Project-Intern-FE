import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getAllWarehouse(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/warehouse';
    return this.http.get(url);
  }

  getWarehouse(warehouseId: number): Observable<any> {
    const url = `http://localhost:8088/api/v1/warehouse/${warehouseId}`;
    return this.http.get(url);
  }

  createWarehouse(newWarehouse: any): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/warehouse', newWarehouse);
  }

  updateWarehouse(warehouseId: number ,warehouse: any): Observable<any> {
    const url = `http://localhost:8088/api/v1/warehouse/${warehouseId}`;
    return this.http.put(url, warehouse);
  }

  deleteWarehouse(warehouseId: number): Observable<void> {
    const url = `http://localhost:8088/api/v1/warehouse/${warehouseId}`;
    return this.http.delete<void>(url);
  }
}
