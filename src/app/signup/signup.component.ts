import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  signUpClicked: boolean;
  
  constructor(private formBuilder: FormBuilder, private blogservice:Blogservice,
    private routes:Router) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])]
      }
    );
    this.signUpClicked = false;
  }

  ngOnInit() {
  }
  saveUser()
  {
    this.blogservice.register({
      user:{
        username:this.registerForm.value.userName,
           email:this.registerForm.value.email,
           password:this.registerForm.value.password
      }}
    ).subscribe((data:any)=>{
    
     this.routes.navigate(['/']);
     
    });
  }

}
