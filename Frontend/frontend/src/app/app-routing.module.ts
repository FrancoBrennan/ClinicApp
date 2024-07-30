import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UserRegisterComponent } from './auth/register/userRegister/user-register.component';
import { HomeComponent } from './pages/home/home/home.component';
import { PatientListComponent } from './components/lists/patient list/patient-list.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ChatComponent } from './components/chat/chat.component';
import { DoctorListComponent } from './components/lists/doctor list/doctor-list/doctor-list.component';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home",component:HomeComponent},
  {path: "login",component:LoginComponent},
  {path: "register",component:UserRegisterComponent},
  {path: "dashboard",component:DashboardComponent, canActivate: [AuthGuard]},
  {
    path: "patient-list",
    component: PatientListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'DOCTOR' }
  },
  {
    path: "doctor-list",
    component: DoctorListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'PATIENT' }
  },
  {path: "chat",component:ChatComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
