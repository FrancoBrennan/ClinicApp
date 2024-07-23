import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

// Con esta clase lo que se hace es agregar el token a las cabeceras de las solicitudes HTTP
// permitiendo verificar la identidad del usuario.
// De esta manera, en lugar de agregar manualmente el token a cada solicitud HTTP en diferentes
// partes de la aplicación, el interceptor centraliza esta lógica,
// facilitando el mantenimiento y la coherencia.

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private loginService:LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String=this.loginService.userToken;

    if (token!=""){
      req=req.clone(
        {
          //Setteamos el header para que 
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    }
    return next.handle(req); //Le pasa el token al siguiente manejador que lo requiera, en este caso la API REST.
  }
}