import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagermentComponent } from './category-managerment.component';

describe('CategoryManagermentComponent', () => {
  let component: CategoryManagermentComponent;
  let fixture: ComponentFixture<CategoryManagermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryManagermentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
