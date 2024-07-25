import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent  {
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;
  private subscriptions: Subscription = new Subscription();

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loadUserData();
    this.subscriptions.add(
      this.loginService.userLoginOn.subscribe(userLoginOn => {

        this.userLoginOn=userLoginOn;

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
    const username = this.loginService.getUsernameFromToken();
    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: userData => {
          this.user = userData;
          this.registerForm.setValue({
            id: userData.id.toString(),
            firstname: userData.firstname,
            lastname: userData.lastname,
            country: userData.country
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

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

  private clearForm() {
    this.registerForm.reset();
    this.user = undefined;
    this.errorMessage = "";
  }

}