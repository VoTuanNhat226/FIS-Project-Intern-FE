import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../SERVICE/order/order.service';
import { UserService } from '../../SERVICE/user/user.service';
import { ProductService } from '../../SERVICE/product/product.service';

@Component({
  selector: 'app-order-managerment',
  standalone: false,
  templateUrl: './order-managerment.component.html',
  styleUrls: ['./order-managerment.component.scss']
})
export class OrderManagermentComponent implements OnInit {
  orders: any[] = [];
  products: any[] = [];
  originalOrder: any = {};
  selectedOrder: any = {};

  orderDetails: any[] = [];
  selectedOrderDetail: any = {};

  selectedOrderId: number = 0; // Khởi tạo với giá trị mặc định là số
  // selectedOrderId: number | null = null;

  isModalVisible: boolean = false;
  isEditModalOpen = false;


  isCreateOrderModalVisible = false;
  isAddProductModalOpen: boolean = false;

  newOrder = {
    status: '',
    paymentMethodEnum: '',
    userId: ''
  };
  newProduct = {
    order: '',
    product: '',
    quantity: 1,
  };

  users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string
   }[] = [];


  constructor(private orderService: OrderService, private userService: UserService, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrder();
    this.getAllUser();
    this.getAllProduct();
  }

  getAllOrder() {
    this.orderService.getAllOrder()
      .subscribe(
        (response: any) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  getAllUser() {
    this.userService.getAllUser()
      .subscribe(
        (response: any) => {
          this.users = response;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  getAllProduct() {
    this.productService.getAllProduct()
      .subscribe(
        (response: any) => {
          this.products = response;
          // console.log(this.products)
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  updateOrderDetail(orderDetail: any) {
    console.log("order id: ", orderDetail.id)
    console.log("order quantity: ", orderDetail.quantity)
    this.orderService.updateOrderDetail(orderDetail.id, orderDetail.quantity).subscribe({
      next: (response) => {
        console.log('Order detail updated:', response);
      },
      error: (err) => {
        console.error('Error updating order detail:', err);
      }
    });
  }


  // Mở modal và lấy chi tiết đơn hàng khi click vào 1 đơn hàng
  openOrderModal(orderId: number) {
    if (orderId && !isNaN(orderId)) {
      this.selectedOrderId = orderId;
      this.isModalVisible = true;

      this.orderService.getOrderDetail(this.selectedOrderId).subscribe({
        next: (orderDetails) => {
          this.orderDetails = orderDetails;
          console.log('Order Details: ', this.orderDetails);
        },
        error: (err) => {
          console.error('Error while fetching order details:', err);
        }
      });
    } else {
      console.error('Invalid Order ID');
    }
  }

  // Đóng modal
  closeOrderModal() {
    this.isModalVisible = false;
    this.selectedOrderId = 0;
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const date: Date = new Date(dateString);
    return date.toLocaleString('en-GB', options).replace(',', '');
  }

  openCreateOrderModal() {
    this.isCreateOrderModalVisible = true;
  }

  closeCreateOrderModal() {
    this.isCreateOrderModalVisible = false;
  }

  handleCreateOrder() {
    if (!this.newOrder.userId) {
      alert("Vui lòng chọn người đặt hàng!");
      return;
    }
    console.log(this.newOrder)
    this.orderService.createOrder(this.newOrder).subscribe(
      (response) => {
        alert("Đơn hàng đã được tạo thành công!");
        this.closeCreateOrderModal();
        this.getAllOrder();
      },
      (error) => {
        alert("Có lỗi xảy ra khi tạo đơn hàng!");
      }
    );
  }

  handleDeleteOrder(orderId: number): void {
    if (confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(order => order.id !== orderId);
          alert('Xóa đơn hàng thành công!');
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert('Lỗi khi xóa đơn hàng.');
        }
      });
    }
  }

  hasChangesOrder(): boolean {
    return this.selectedOrder.userId !== this.originalOrder.userId ||
    this.selectedOrder.status !== this.selectedOrder.status ||
    this.selectedOrder.paymentMethodEnum !== this.selectedOrder.paymentMethodEnum
  }

  handleUpdateOrder(): void {
    if (!this.hasChangesOrder()) {
      alert('Không có thay đổi nào, không cập nhật.');
      return;
    }
    this.orderService.updateOrder(this.selectedOrder).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        this.orders.sort((a, b) => a.id - b.id);
        this.closeEditModal();
        alert('Cập nhật đơn hàng thành công!');
        this.getAllOrder();
      },
      error: (err) => {
        console.error('Error updating order:', err);
        alert('Lỗi khi cập nhật đơn hàng.');
      }
    });
  }

  openEditModal(order: any) {
    this.selectedOrder = { ...order };
    this.originalOrder = { ...order };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }
  // Thêm sản phẩm vào đơn hàng
  handleAddProduct() {
    console.log('Thêm sản phẩm:', this.newProduct);
    this.orderService.addProductForOrder(this.newProduct).subscribe(
      (response) => {
        alert("Thêm sản phẩm thành công!");
        this.closeAddProductModal();
        this.getAllOrder();
      },
      (error) => {
        if (error.error && error.error.message) {
          alert("" + error.error.message);  // Hiển thị thông báo lỗi từ backend
        } else {
          alert("Có lỗi xảy ra khi thêm sản phẩm!");  // Hiển thị lỗi mặc định nếu không có thông báo cụ thể
        }
      }
    );
  }

  resetProductForm() {
    this.newProduct = {
      order: '',
      product: '',
      quantity: 1,
    };
  }

  openAddProductModal() {
    this.isAddProductModalOpen = true;
  }

  closeAddProductModal() {
    this.isAddProductModalOpen = false;
    this.resetProductForm();
  }
  // End thêm sản phẩm vào đơn hàng

  deleteOrderDetail(orderDetailId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.orderService.deleteOrderDetail(orderDetailId).subscribe({
        next: () => {
          this.orderService.getOrderDetail(this.selectedOrderId).subscribe({
            next: (orderDetails) => {
              this.orderDetails = orderDetails;
              console.log('Order Details: ', this.orderDetails);
            },
            error: (err) => {
              console.error('Error while fetching order details:', err);
            }
          });
          alert('Xóa sản phẩm thành công!');
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert('Lỗi khi xóa đơn hàng.');
        }
      });
    }
  }
}
