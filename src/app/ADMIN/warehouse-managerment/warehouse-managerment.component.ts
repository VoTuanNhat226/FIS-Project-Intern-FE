import { Component } from '@angular/core';
import { WarehouseService } from '../../SERVICE/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse-managerment',
  standalone: false,

  templateUrl: './warehouse-managerment.component.html',
  styleUrl: './warehouse-managerment.component.scss'
})
export class WarehouseManagermentComponent {
  warehouses: any[] = [];
  newWarehouse = {
    name: '',
    address: '',
    phone: '',
    capacity: 0
  }
  searchTerm: string = '';

  isCreateModalOpen = false;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getAllWarehouse();
  }

  getAllWarehouse() {
    this.warehouseService.getAllWarehouse()
      .subscribe(
        (response: any) => {
          this.warehouses = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  handleCreateWarehouse(): void {
    if (this.newWarehouse.name && this.newWarehouse.address && this.newWarehouse.phone && this.newWarehouse.capacity) {
      console.log(this.newWarehouse)
      this.warehouseService.createWarehouse(this.newWarehouse).subscribe({
        next: (createdWarehouse) => {
          this.warehouses.unshift(createdWarehouse);
          this.warehouses.sort((a, b) => a.id - b.id);
          this.closeCreateModal();
          alert('Thêm nhà kho thành công!');
          this.getAllWarehouse();
          this.newWarehouse = {
            name: '',
            address: '',
            phone: '',
            capacity: 0,
          };
        },
        error: (err) => {
          console.error('Error creating warehouse:', err);
          alert('Lỗi khi thêm nhà kho.');
        }
      });
    }
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }
  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  handleDeleteWarehouse(warehouseId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhà kho này không?')) {
      this.warehouseService.deleteWarehouse(warehouseId).subscribe({
        next: () => {
          this.warehouses = this.warehouses.filter(warehouse => warehouse.id !== warehouseId);
          alert('Nhà kho đã được xóa thành thông!');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Không thể xóa nhà kho này!');
        }
      });
    }
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
}
