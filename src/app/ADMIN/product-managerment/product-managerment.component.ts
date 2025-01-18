import { Component } from '@angular/core';
import { ProductService } from '../../SERVICE/product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../SERVICE/category/category.service';

@Component({
  selector: 'app-product-managerment',
  standalone: false,

  templateUrl: './product-managerment.component.html',
  styleUrl: './product-managerment.component.scss'
})
export class ProductManagermentComponent {
  products: any[] = [];
  selectedProduct: any = {};
  originalProduct: any = {};
  newProduct = {
    name: '',
    image: '',
    description: '',
    price: null,
    costPrice: null,
    category: null
  };

  searchTerm: string = '';

  categories: any[] = [];

  isCreateModalOpen = false;
  isEditModalOpen = false;
  optionsVisible = false;

  selectedFile: File | null = null;
  entityName: string = 'Product';

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
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

  getAllCategory() {
    this.categoryService.getAllCategory()
      .subscribe(
        (response: any) => {
          this.categories = response;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  handleCreateProduct(): void {
    if (this.newProduct.name && this.newProduct.image && this.newProduct.description && this.newProduct.price && this.newProduct.costPrice && this.newProduct.category) {
      console.log(this.newProduct)
      this.productService.createProduct(this.newProduct).subscribe({
        next: (createdProduct) => {
          this.products.unshift(createdProduct);
          this.products.sort((a, b) => a.id - b.id);
          this.closeCreateModal();
          alert('Thêm sản phẩm thành công!');
          this.getAllProduct();
          this.newProduct = {
            name: '',
            image: '',
            description: '',
            price: null,
            category: null,
            costPrice: null,

          };
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert('Lỗi khi thêm sản phẩm');
        }
      });
    }
  }

  hasChangesProduct(): boolean {
    return this.selectedProduct.name !== this.originalProduct.name ||
    this.selectedProduct.image !== this.originalProduct.image ||
    this.selectedProduct.description !== this.originalProduct.description ||
    this.selectedProduct.price !== this.originalProduct.price ||
    this.selectedProduct.costPrice !== this.originalProduct.costPrice ||
    this.selectedProduct.quantity_in_stock !== this.originalProduct.quantity_in_stock;
  }

  handleUpdateProduct(): void {
    if (!this.hasChangesProduct()) {
      alert('Không có thay đổi nào, không cập nhật');
      return;
    }
    this.productService.updateProduct(this.selectedProduct).subscribe({
      next: (updatedProduct) => {
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.products.sort((a, b) => a.id - b.id);
        this.closeEditModal();
        alert('Cập nhật sản phẩm thành công!');
        this.getAllProduct();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Lỗi khi cập nhật sản phẩm.');
      }
    });
  }

  handleSearchProduct(): void {
    if(this.searchTerm == "") {
      this.getAllProduct()
    }
    if (this.searchTerm.trim()) {
      this.productService.searchProduct(this.searchTerm).subscribe({
        next: (products) => {
          this.products = products;
          console.log('Found products:', this.products);
        },
        error: (err) => {
          console.error('Error while searching products:', err);
        }
      });
    }
  }

  generateReport(format: string) {
    this.productService.exportReport(format).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `report.${format}`;
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log("File selected:", this.selectedFile);
    }
  }

  importData(): void {
    if (!this.selectedFile) {
      alert('Vui lòng chọn file!');
      return;
    }
    this.productService.importExcel(this.selectedFile, this.entityName).subscribe(
      (response) => {
        alert('Import dữ liệu thành công');
        this.getAllProduct();
      },
      (error) => {
        console.error('Lỗi khi import dữ liệu:', error);
        alert('Đã xảy ra lỗi khi import dữ liệu!');
      }
    );
  }

  handleDeleteProduct(productId: number): void {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          alert('Xóa sản phẩm thành công!');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Lỗi khi xóa sản phẩm.');
        }
      });
    }
  }

  openEditModal(product: any) {
    this.selectedProduct = { ...product };
    this.originalProduct = { ...product };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  showOptions() {
    this.optionsVisible = true;
  }

  hideOptions() {
    this.optionsVisible = false;
  }
}
