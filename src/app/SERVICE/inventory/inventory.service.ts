import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/inventory';
    return this.http.get(url);
  }

  getInventoryByProductId(productId: number): Observable<any> {
    const url = `http://localhost:8088/api/v1/inventory/product/${productId}`;
    return this.http.get(url);
  }

  createInventory(newInventory: any): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/inventory', newInventory);
  }

  updateInventory(inventoryId: number ,inventory: any): Observable<any> {
    const url = `http://localhost:8088/api/v1/inventory/${inventoryId}`;
    return this.http.put(url, inventory);
  }

  deleteInventory(inventoryId: number): Observable<void> {
    const url = `http://localhost:8088/api/v1/inventory/${inventoryId}`;
    return this.http.delete<void>(url);
  }

  startProcess(processDefinitionKey: string, variables: any): Observable<any> {
    const payload = { processDefinitionKey, variables };
    return this.http.post<any>('http://localhost:8088/camunda/start', payload);
  }
}

