import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserByUsername(username: String): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}user/username/${username}`).pipe(
      catchError(this.handleError)
    );
  }
  
  getPatients(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlApi+"user/patients");
  }

  getDoctors() {
    return this.http.get<User[]>(environment.urlApi+"user/doctors");
  }

  updateUser(userRequest:User):Observable<any>
  {
    return this.http.put(environment.urlApi+"user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    
    if(error.status===0){
      console.error("Se ha producido un error", error.error);
    }
    else{
      console.error("Backend retornó el código de estado", error.status, error.error);
    }

    return throwError(() => new Error("Algo falló. Por favor intente nuevamente"))
  }
}
