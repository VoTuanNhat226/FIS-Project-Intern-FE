import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<any> {
    const apiUrlGetAllOrder = 'http://localhost:8088/api/v1/order';
    return this.http.get(apiUrlGetAllOrder);
  }

  createOrder(newOrder: any): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/order', newOrder);
  }

  getOrderDetail(orderId: number): Observable<any> {
    const apiUrlGetOrderDetail = `http://localhost:8088/api/v1/order/${orderId}/detail`;
    return this.http.get(apiUrlGetOrderDetail);
  }

  updateOrderDetail(orderDetailId: number ,orderDetail: any): Observable<any> {
    const apiUrlUpdateOrderDetail = `http://localhost:8088/api/v1/orderDetail/${orderDetailId}`;
    return this.http.put(apiUrlUpdateOrderDetail, orderDetail);
  }

  deleteOrder(orderId: number): Observable<void> {
    const apiUrlDeleteOrder = `http://localhost:8088/api/v1/order/${orderId}`;
    return this.http.delete<void>(apiUrlDeleteOrder);
  }

  updateOrder(order: any): Observable<any> {
    const apiUrlUpdateOrder = `http://localhost:8088/api/v1/order/${order.id}`;
    return this.http.put(apiUrlUpdateOrder, order);
  }

  addProductForOrder(newProduct: any): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/orderDetail', newProduct);
  }

  deleteOrderDetail(orderDetailId: number): Observable<void> {
    const apiUrlDeleteOrderDetail = `http://localhost:8088/api/v1/orderDetail/${orderDetailId}`;
    return this.http.delete<void>(apiUrlDeleteOrderDetail);
  }

  countOrders(): Observable<any> {
    const url = 'http://localhost:8088/api/v1/order/count-order';
    return this.http.get(url);
  }
}
