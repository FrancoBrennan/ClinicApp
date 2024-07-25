import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/auth/register.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../services/auth/registerRequest';

@Component({
  selector: 'app-user-register',  // Actualiza el selector
  templateUrl: './user-register.component.html',  // Actualiza la ruta del template
  styleUrls: ['./user-register.component.css']    // Actualiza la ruta del estilo
})
export class UserRegisterComponent implements OnInit{

  registerError: string = "";

  registerForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    country: ["", [Validators.required]],
    role: ["", [Validators.required]],
    license:["",[Validators.required]]
  }) //{ validator: this.passwordMatchValidator });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get firstname() {
    return this.registerForm.controls.firstName;
  }

  get lastname() {
    return this.registerForm.controls.lastName;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  get license(){
    return this.registerForm.controls.license;
  }

  get role() {
    return this.registerForm.controls.role;
  }

  /*
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get role() {
    return this.registerForm.controls['role'];
  }
  

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  */

  register() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.registerError = errorData.message; //Muestra un mensaje en pantalla.
        },
        complete: () => {
          console.log("Register complete");
          this.router.navigateByUrl("/login");
          this.registerForm.reset();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

}
