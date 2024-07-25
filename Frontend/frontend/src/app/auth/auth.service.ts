import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Aquí puedes verificar si hay un token en localStorage, por ejemplo
    return !!localStorage.getItem('token');
  }

}
