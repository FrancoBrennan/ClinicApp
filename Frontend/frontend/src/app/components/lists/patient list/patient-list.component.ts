import { Component, OnInit } from '@angular/core';
import { User } from '../../../services/auth/user';
import { UserService } from '../../../services/user/user.service';
import { SocketService } from '../../../services/chat/socket.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { SharedService } from '../../../services/shared/shared-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: User[] = [];
  selectedPatient: User | null = null;

  constructor(private userService: UserService, private socketService: SocketService, private router:Router, private authService:AuthService, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.userService.getPatients().subscribe((data: User[]) => {
      this.patients = data;
    });
  }

  viewPatientDetails(patient: User): void {
    this.selectedPatient = patient;
  }

  closePatientDetails(): void {
    this.selectedPatient = null;
  }

  joinChat(patientUsername: string): void {
    const doctorUsername = this.authService.getUsernameFromToken() as string;

    // Redirige primero y luego une a la sala de chat
    this.router.navigate(['/chat']).then(() => {
      // Redirige primero y luego une a la sala de chat
      //this.sharedService.setDoctorUsername(doctorUsername)
      //this.sharedService.setPatientUsername(patientUsername)

      sessionStorage.setItem("doctor",doctorUsername)
      sessionStorage.setItem("patient",patientUsername)
    });
    
  }
}
