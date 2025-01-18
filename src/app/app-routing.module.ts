import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './COMMON/register/register.component';
import { LoginComponent } from './COMMON/login/login.component';
import { DashboardComponent } from './ADMIN/dashboard/dashboard.component';
import { AuthGuard } from './SERVICE/guard/auth.guard';
import { ForgotPasswordComponent } from './COMMON/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './COMMON/reset-password/reset-password.component';
import { HomeComponent } from './CLIENT/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  { path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
