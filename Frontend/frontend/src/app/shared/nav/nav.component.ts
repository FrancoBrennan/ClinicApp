import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
    userLoginOn:boolean=false;
    isDoctor:boolean=false;

    constructor(private loginService:LoginService, private router:Router){}

    ngOnInit(): void { //Este evento es el que se ejecuta cuando arranca la aplicación.
      this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn) =>{
          this.userLoginOn=userLoginOn; //De esta manera le asignamos a nuestra variable local el valor acerca de si está logueado o no.
          console.log(this.loginService.getRoleFromToken())
          this.isDoctor=(this.loginService.getRoleFromToken() === 'DOCTOR')
        }
      } //Acá sabremos si está logueado o no.
    )

    }

    logOut()
    {
      this.loginService.logout();
      this.router.navigate(['/home'])
    }
}
