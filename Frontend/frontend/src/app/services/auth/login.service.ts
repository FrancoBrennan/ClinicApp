import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from "./user";
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //Establecemos los valores iniciales de los BehaviorSubject para el
  //inicio de sesión si se concretó es true y sino es false,
  //y el otro BehaviorSubject contiene el id y el username del usuario logueado.
  //De esta manera, los componentes que se suscriban a estos behaviorSubject
  //podrán acceder a esta info.

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>(""); //La API no está devolviendo un usuario sino que nos devuelve un Token.
  //El currentUserData es el token.

  //Una vez que el usuario inicia sesión recibe un token. Ese token tienen un tiempo de caducidad.
  //Por lo tanto, a la hora de utilizar un servicio es importante que se revise si todavia está en el sessionStorage
  //o algun mecanismo de memoria para acceder al último registro y tratar de enviarlo, sino me obligara a iniciar sesión.

  //Entonces inicializo esas dos variables de BehaviorSubject:

  constructor(private http:HttpClient) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null); //Si no es null da verdadero.
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || ""); //Si no está el token devuelve una cadena vacía.
  }


  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token), //El operador Map lo que hace es que independientemente de lo que devuelva la API puedo transformar esos datos,
      catchError(this.handleError)      //entonces en lugar de devolver un JSON como devuelve la API sólo devuelvo un token.

    );
  }

  logout():void{
    sessionStorage.removeItem("token"); //Remuevo el token del sessionStorage.
    this.currentUserData.next("");
    this.currentUserLoginOn.next(false); //Le avisa a tods los componentes que esten suscriptos a este servicio que ya no tienen más acceso.
  }

  private handleError(error:HttpErrorResponse){
    
    if(error.status===0){
      console.error("Se ha producido un error", error.error);
    }
    else{
      console.error("Backend retornó el código de estado", error);
    }

    return throwError(() => new Error("Algo falló. Por favor intente nuevamente"))
  }

  getUsernameFromToken(): String | null {
    const token = this.currentUserData.value;
    if (token) {
      const decodedToken: any = jwtDecode(token.toString());
      return decodedToken.sub;  // Assuming the username is stored in the "sub" claim
    }
    return null;
  }

  //Los gets son para que los componentes se puedan suscribir.

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
  
}
