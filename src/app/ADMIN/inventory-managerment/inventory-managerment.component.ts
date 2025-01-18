import { Component } from '@angular/core';
import { WarehouseService } from '../../SERVICE/warehouse/warehouse.service';
import { InventoryService } from '../../SERVICE/inventory/inventory.service';
import { ProductService } from '../../SERVICE/product/product.service';

@Component({
  selector: 'app-inventory-managerment',
  standalone: false,

  templateUrl: './inventory-managerment.component.html',
  styleUrl: './inventory-managerment.component.scss'
})
export class InventoryManagermentComponent {
  searchTerm: string = '';

  inventorys: any[] = [];
  products: any[] = [];
  warehouses: any[] = [];

  newInventory = {
    product: '',
    warehouse: '',
    quantity: '',
  };

  isCreateModalOpen = false;

  constructor(private warehouseService: WarehouseService, private inventoryService: InventoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllInventory();
    this.getAllProduct();
    this.getAllWarehouse();
  }

  getAllInventory() {
    this.inventoryService.getAllInventory()
      .subscribe(
        (response: any) => {
          this.inventorys = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  getAllProduct() {
    this.productService.getAllProduct()
      .subscribe(
        (response: any) => {
          this.products = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
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

  createInventory(): void {
    const processVariables = {
      productId: this.newInventory.product,
      warehouseId: this.newInventory.warehouse,
      quantity: this.newInventory.quantity
    }
    if (this.newInventory.quantity && this.newInventory.product && this.newInventory.warehouse) {
      console.log(this.newInventory)
      this.inventoryService.startProcess('Process_1xmynqy', processVariables).subscribe(
        () => {
          this.getAllInventory();
        }
      )
      this.inventoryService.createInventory(this.newInventory).subscribe({
        next: (createdInventory) => {
          this.inventorys.unshift(createdInventory);
          this.inventorys.sort((a, b) => a.id - b.id);
          this.closeCreateModal();
          alert('Thêm hàng thành công!');
          this.getAllInventory();
          this.newInventory = {
            product: '',
            warehouse: '',
            quantity: '',
          };
        },
        error: (err) => {
          console.error('Error creating warehouse:', err);
          alert('Lỗi khi thêm hàng.');
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

  handleDeleteInventory(inventoryId: number): void {
    if (confirm('Bạn chắc chắn muốn xóa hàng này?')) {
      this.inventoryService.deleteInventory(inventoryId).subscribe({
        next: () => {
          this.inventorys = this.inventorys.filter(inventory => inventory.id !== inventoryId);
          alert('Xóa hàng thành công!');
        },
        error: (err) => {
          console.error('Error deleting inventory:', err);
          alert('Lỗi khi xóa hàng.');
        }
      });
    }
  }
}
