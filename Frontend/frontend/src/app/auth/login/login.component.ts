import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginError:string="" //Mensaje a mostrar en pantalla en caso de error en el get a la API.

  loginForm = this.formBuilder.group({
    username:["",[Validators.required]],
    password:["",[Validators.required]],
  })

  constructor(private  formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}

  ngOnInit(): void {
      
  }

  get username(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){

    if(this.loginForm.valid){
      
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError=errorData; //Muestra un mensaje en pantalla.
        },
        complete: () => {
          console.log("Login complete")
          this.router.navigateByUrl("/home");
          this.loginForm.reset();
        }

      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
      
  }
  
}
