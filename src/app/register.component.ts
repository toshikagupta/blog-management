import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  signUpClicked: boolean;
  userName: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])]
      }
    );
    this.userName = this.registerForm.controls['userName'];
    this.password = this.registerForm.controls['password'];
    this.email = this.registerForm.controls['email'];
    this.signUpClicked = false;
  }
  signUpTapped() {
    console.log(this.userName.value);
    console.log(this.email.value);
    console.log(this.password.value);
    this.signUpClicked = true;
  }

  ngOnInit() {
  }

}
