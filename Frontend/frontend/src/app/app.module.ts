import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { HomeComponent } from './pages/home/home/home.component';
import { UserRegisterComponent } from './auth/register/userRegister/user-register.component';
import { PatientListComponent } from './components/lists/patient list/patient-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { SocketService } from './services/chat/socket.service';
import { DoctorListComponent } from './components/lists/doctor list/doctor-list/doctor-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    PersonalDetailsComponent,
    UserRegisterComponent,
    HomeComponent,
    PatientListComponent,
    ChatComponent,
    DoctorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true}, //El multi=true significa que permite multiples hilos
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi:true},
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
