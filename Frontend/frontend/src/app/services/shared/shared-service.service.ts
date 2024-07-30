import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Usernames {
  doctor: string | null;
  patient: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Crear un BehaviorSubject con el objeto de nombres de usuario
  private usernamesSource = new BehaviorSubject<Usernames>({ doctor: null, patient: null });

  // Crear un observable para que los componentes se suscriban a los cambios
  usernames$ = this.usernamesSource.asObservable();

  constructor() { }

  // Métodos para actualizar los nombres de usuario
  setDoctorUsername(username: string) {
    const currentUsernames = this.usernamesSource.getValue();
    this.usernamesSource.next({ ...currentUsernames, doctor: username });
  }

  setPatientUsername(username: string) {
    const currentUsernames = this.usernamesSource.getValue();
    this.usernamesSource.next({ ...currentUsernames, patient: username });
  }

  // Métodos para obtener los nombres de usuario
  getDoctorUsername(): string | null {
    return this.usernamesSource.getValue().doctor;
  }

  getPatientUsername(): string | null {
    return this.usernamesSource.getValue().patient;
  }
}
