import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  
  
  
  article:any;
  username:any;
  user:any;
  constructor(private blogservice:Blogservice) { 
    
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser()
  { 
     this.blogservice.getCurrentUser().subscribe((data:any)=>{
       console.log(data.user);
       this.user=data.user;
       this.username=data.user.username;
    //  this.user=data.article
     }); 
  }
  getMyArticles()
  { 
     this.blogservice.getMyArticles(this.username).subscribe((data:any)=>{
      this.article=data.articles
     
     }); 
  }
  getFavouriteArticles()
  {
    this.blogservice.getMyFavouriteArticles(this.username).subscribe((data:any)=>{
      this.article=data.articles
      
      }); 
  }


}
