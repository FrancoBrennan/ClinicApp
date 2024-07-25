import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserRegisterComponent } from './auth/register/userRegister/user-register.component';
import { HomeComponent } from './pages/home/home/home.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home",component:HomeComponent},
  {path: "login",component:LoginComponent},
  {path: "register",component:UserRegisterComponent},
  {path: "dashboard",component:DashboardComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
