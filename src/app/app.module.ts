import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';  // Import ChartsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './CLIENT/home/home.component';
import { RegisterComponent } from './COMMON/register/register.component';
import { LoginComponent } from './COMMON/login/login.component';
import { DashboardComponent } from './ADMIN/dashboard/dashboard.component';
import { ProductManagermentComponent } from './ADMIN/product-managerment/product-managerment.component';
import { ChartBarComponent } from './ADMIN/chart-bar/chart-bar.component';
import { OrderManagermentComponent } from './ADMIN/order-managerment/order-managerment.component';
import { ForgotPasswordComponent } from './COMMON/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './COMMON/reset-password/reset-password.component';
import { WarehouseManagermentComponent } from './ADMIN/warehouse-managerment/warehouse-managerment.component';
import { InventoryManagermentComponent } from './ADMIN/inventory-managerment/inventory-managerment.component';
import { CategoryManagermentComponent } from './ADMIN/category-managerment/category-managerment.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProductManagermentComponent,
    ChartBarComponent,
    OrderManagermentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WarehouseManagermentComponent,
    InventoryManagermentComponent,
    HomeComponent,
    CategoryManagermentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule  // Import ChartsModule từ ng2-charts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
