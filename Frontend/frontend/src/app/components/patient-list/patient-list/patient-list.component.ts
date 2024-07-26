import { Component, OnInit } from '@angular/core';
import { User } from '../../../services/auth/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: User[] = [];
  selectedPatient: User | null = null;

  constructor(private userService: UserService) {}

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
}
