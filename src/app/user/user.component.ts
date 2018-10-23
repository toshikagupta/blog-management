import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  profiledata:any={image:''};
  article:any;
  username:any;
  display:any;
  loggedIn:any;
  constructor(private blogservice:Blogservice, private active:ActivatedRoute) { 
    this.active.params.subscribe( params => {
      this.username = params.username
  });
  }

  ngOnInit() {
    this.getUser(this.username);
    this.display=true;
    this.loggedIn=window.localStorage.getItem('tokenVal');
  }
  getUser(username)
  { 
     this.blogservice.getUser(username).subscribe((data:any)=>{
       this.profiledata=data.profile;
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
    this.blogservice.getMyArticles(this.username).subscribe((data:any)=>{
      this.article=data.articles
      
      }); 
  }
  followUser()
  {
    
    this.blogservice.followUser(this.username).subscribe((data:any)=>{
     // this.profiledata.following=true;
      this.profiledata=data.profile;
     
    })
  }
  UnfollowUser()
  {
    this.blogservice.UnfollowUser(this.username).subscribe((data:any)=>{
      this.profiledata=data.profile;
      //this.profiledata.following=false;
    
    })
  }


}
