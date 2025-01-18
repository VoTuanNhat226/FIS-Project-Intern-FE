import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagermentComponent } from './warehouse-managerment.component';

describe('WarehouseManagermentComponent', () => {
  let component: WarehouseManagermentComponent;
  let fixture: ComponentFixture<WarehouseManagermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseManagermentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
