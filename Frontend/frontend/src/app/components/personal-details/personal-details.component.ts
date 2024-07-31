import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnDestroy {
  errorMessage: String = "";
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  private subscriptions: Subscription = new Subscription();
  isDoctor:boolean = false;

  registerForm = this.formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required],
    license: [''] // Optional field for doctors
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadUserData();
    this.subscriptions.add(
        this.authService.isLoggedIn().subscribe(userLoginOn => {
        
        this.userLoginOn = userLoginOn;
        this.isDoctor = this.authService.getRole() === 'DOCTOR';

        if (this.isDoctor) {
          this.license.setValidators([Validators.required]);
        } else {
          this.license.clearValidators();
        }
        this.license.updateValueAndValidity();

        if (!userLoginOn) {
          this.clearForm();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadUserData() {
    const username = this.authService.getUsernameFromToken();
    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: userData => {
          this.user = userData;
          this.registerForm.setValue({
            firstname: userData.firstname,
            lastname: userData.lastname,
            country: userData.country,
            license: userData.license
          });
        },
        error: errorData => {
          this.errorMessage = errorData.message;
        }
      });
    } else {
      this.errorMessage = "No se pudo obtener el nombre de usuario.";
    }
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  get license(){
    return this.registerForm.controls.license;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      const updatedUser: User = {
        username: this.authService.getUsernameFromToken()!, // Asegúrate de incluir el nombre de usuario
        firstname: this.registerForm.value.firstname!,
        lastname: this.registerForm.value.lastname!,
        country: this.registerForm.value.country!,
        id: 0,
        license: this.registerForm.value.license!,
        role: this.authService.getRole() as string
      };
  
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          this.editMode = false;
          this.user = updatedUser;
        },
        error: (errorData) => console.error(errorData)
      });
    }
  }

  private clearForm() {
    this.registerForm.reset();
    this.user = undefined;
    this.errorMessage = "";
  }
}
