import { Component, OnInit } from '@angular/core';
import { Blogservice } from '../blogservice.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  username:any;
  email:any;
  
  settingsForm=new FormGroup(
    {
      email: new FormControl(''),
username: new FormControl(''),
bio: new FormControl(''),
password: new FormControl(''),
url: new FormControl('')
    }
  );

  
  updateClicked:any;
  constructor(private formBuilder: FormBuilder, private blogservice:Blogservice,
    private routes:Router) {
   
    this.updateClicked = false;
  }

  ngOnInit() {
    this.blogservice.getCurrentUser().subscribe((data:any)=>{
      this.settingsForm.controls['email'].setValue(data.user.email); 
      this.settingsForm.controls['username'].setValue(data.user.username);

      
  });

}
change()
{
  console.log("email:"+this.settingsForm.value.email)
  this.blogservice.updateUser({
    user:{
      image:this.settingsForm.value.url,
         username:this.settingsForm.value.username,
         bio:this.settingsForm.value.bio,
         email: this.settingsForm.value.email,
         password:this.settingsForm.value.password
    }}
  ).subscribe((data:any)=>{
  console.log("article-data"+data);
   this.routes.navigate(['']);
  
  });
  this.blogservice.updateHeader();
}
logout()
{
  window.localStorage.removeItem('tokenVal');
  this.blogservice.updateSubject();
  this.routes.navigate([''])
}
}
