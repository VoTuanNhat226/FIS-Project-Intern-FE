import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagermentComponent } from './inventory-managerment.component';

describe('InventoryManagermentComponent', () => {
  let component: InventoryManagermentComponent;
  let fixture: ComponentFixture<InventoryManagermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryManagermentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
