import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from './registerRequest';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}auth/register`, registerRequest).pipe(
      tap((userData) => {
        
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status);
    }

    return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  }
}
