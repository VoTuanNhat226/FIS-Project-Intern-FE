import { Component } from '@angular/core';
import { CategoryService } from '../../SERVICE/category/category.service';
import { CamundaService } from '../../SERVICE/camunda/camunda.service';

@Component({
  selector: 'app-category-managerment',
  standalone: false,

  templateUrl: './category-managerment.component.html',
  styleUrl: './category-managerment.component.scss'
})
export class CategoryManagermentComponent {
  categories: any[] = [];
  selectedCategory: any = {};
  originalCategory: any = {};
  newCategory = {
    name: '',
    description: '',
  };

  isCreateModalOpen = false;

  isEditModalOpen = false;

  constructor(private categoryService: CategoryService, private camundaService: CamundaService) {}

  ngOnInit(): void {
    this.getAllCategory();
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

  verifyName(): void {
    if(this.newCategory.name &&  this.newCategory.description) {
      this.camundaService.startProcess(this.newCategory.name).subscribe({
        next: () => {
          alert('Tên hợp lệ!');
        },
        error: (err) => {
          console.error('Error creating category:', err);
          alert('Lỗi khi thêm danh mục');
        }
      });
    } else {
      alert('Tên hoặc mô tả không được để trống')
    }
  }

  handleCreateCategory(): void {
    this.camundaService.completeTask().subscribe({
      next: () => {
        alert('Thêm thành công');
        this.getAllCategory();
        this.closeCreateModal();
      },
      error: (err) => {
        console.error('Error creating category:', err);
        alert('Lỗi khi thêm danh mục');
      }
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  hasChangesCategory(): boolean {
    return this.selectedCategory.name !== this.originalCategory.name ||
    this.selectedCategory.description !== this.originalCategory.description
  }

  handleUpdateCategory(): void {
    if (!this.hasChangesCategory()) {
      alert('Không có thay đổi nào, không cập nhật');
      return;
    }
    this.categoryService.updateCategory(this.selectedCategory).subscribe({
      next: (updatedCategory) => {
        const index = this.categories.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        this.categories.sort((a, b) => a.id - b.id);
        this.closeEditModal();
        alert('Cập nhật danh mục thành công!');
        this.getAllCategory();
      },
      error: (err) => {
        console.error('Error updating category:', err);
        alert('Lỗi khi cập nhật danh mục.');
      }
    });

  }

  openEditModal(category: any) {
    this.selectedCategory = { ...category };
    this.originalCategory = { ...category };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  handleDeleteCategory(categoryId: number): void {
    if (confirm('Bạn chắc chắn muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(category => category.id !== categoryId);
          alert('Xóa danh mục thành công!');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Lỗi khi xóa sản phẩm.');
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
