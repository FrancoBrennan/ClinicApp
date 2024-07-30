import { Component } from '@angular/core';
import { User } from '../../../../services/auth/user';
import { UserService } from '../../../../services/user/user.service';
import { SocketService } from '../../../../services/chat/socket.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { SharedService } from '../../../../services/shared/shared-service.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  doctors: User[] = [];
  selectedDoctor: User | null = null;

  constructor(private userService: UserService, private router:Router, private authService:AuthService, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.userService.getDoctors().subscribe((data: User[]) => {
      this.doctors = data;
    });
  }

  viewDoctorDetails(doctor: User): void {
    this.selectedDoctor = doctor;
  }

  closeDoctorDetails(): void {
    this.selectedDoctor = null;
  }

  joinChat(doctorUsername: string): void {
    const patientUsername = this.authService.getUsernameFromToken() as string;

    // Redirige primero y luego une a la sala de chat
    this.router.navigate(['/chat']).then(() => {
      sessionStorage.setItem("doctor",doctorUsername)
      sessionStorage.setItem("patient",patientUsername)
    });
  }
}
