import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from'@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  signInForm: FormGroup;
  signInClicked: boolean;
  constructor(private blogservice:Blogservice,private formBuilder: FormBuilder,private routes:Router ) { 

    this.signInForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])]
      }
    );
    this.signInClicked = false;
  }

  ngOnInit() {
  }
  signIn()
  {
    this.blogservice.authenticateUser({
      user:{
           email:this.signInForm.value.email,
           password:this.signInForm.value.password
      }}
    ).subscribe((data:any)=>{
      console.log("data")
      console.log(data)
      this.blogservice.saveToken( data.user.token)
       this.blogservice.updateHeader();
      this.blogservice.updateSubject();
     this.routes.navigate(['afterloginpage']);
    });
  }

}
