import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import{ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { all } from 'q';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  public article:any = {author:{image:'',updatedAt:''}};
  public slug;
  public date;
  public currentuser;
 
  public comment;
  public allComments;
  public active;
  public loggedIn;
  userInputs=new FormGroup(
    {
      comment: new FormControl('')
    });
  constructor(private route: ActivatedRoute,private blogservice:Blogservice, private router:Router){
    this.route.params.subscribe( params => {
      this.slug = params.slug
     
  });
 
  }
  ngOnInit() {
    this.getBlog(this.slug);
    if(window.localStorage.getItem('tokenVal'))
    {
    this.blogservice.getCurrentUser().subscribe((data:any)=>{
      this.currentuser=data.user.username;
      
    });
    this.loggedIn=window.localStorage.getItem('tokenVal');
  }
  
   
   this.getAllComments(this.slug);
   
    
  }
  getBlog(slug)
  {
     this.blogservice.getBlog(slug).subscribe((data:any)=>{
     this.article=data.article
     this.date=new Date(this.article.updatedAt).toDateString();
    
     });  
  }
  onSubmit()
  {
    if(this.loggedIn)
    {
    this.blogservice.postComment(this.slug,
    {comment:{
      body:this.userInputs.value.comment
    }}).subscribe((data:any)=>{
     this.comment=data.comment.body;
     this.allComments.push(data.comment);
    }
    );
  }
  else
  {
    this.router.navigate(['users/login']);
  }
  }
  deleteArticle()
  {
    this.blogservice.deleteArticle(this.slug).subscribe((data:any)=>
    
    this.router.navigate(['afterloginpage'])
    )
  }
  getAllComments(slug)
  {
     this.blogservice.getAllComments(slug).subscribe((data:any)=>
     {
       this.allComments=data.comments;
      //  console.log(data.comments);
     })
    
  }
  deleteComment(id)
  {
    this.blogservice.deleteComment(this.slug,id).subscribe((data:any)=>
    {
      this.allComments.splice(this.allComments.indexOf(data.comment),1)
    })
  }
  editArticle()
  { 
    if(this.blogservice.getToken())
    this.router.navigate(['/editArticle', this.slug]);
    else
    {
      
    }
  }
  favourite()
  {
    if(this.loggedIn)
    {
    console.log("fav called");
    console.log(this.article.favorited);
    this.blogservice.favouriteArticle(this.slug,this.article).subscribe((data:any)=>
   { console.log(data.article)
    this.article=data.article
   }
    )
  }
  else
  {
    this.router.navigate(['']);
  }
  }
  Unfavourite()
  {
    if(this.loggedIn)
  {  console.log("Unfav called");
    console.log(this.article.favorited);

    
    this.blogservice.unfavouriteArticle(this.slug).subscribe((data:any)=>
   { this.article=data.article
    console.log(data.article);
  }
    )
}
else
{
  this.router.navigate(['']);
}
  }
  followUser()
  {
    if(this.loggedIn)
   { this.blogservice.followUser(this.article.author.username).subscribe((data:any)=>{
     this.article.author.following=true;
    // console.log(data);
     // this.profiledata=data.profile;
     
    })
  }
  else{
    this.router.navigate(['']);
  }
  }
  UnfollowUser()
  {
    if(this.loggedIn)
    {
    this.blogservice.UnfollowUser(this.article.author.username).subscribe((data:any)=>{
      this.article.author.following=false;
     // console.log(data);
     // this.profiledata=data.profile;
      //this.profiledata.following=false;
    
    })
  }
  else
  {
    this.router.navigate(['']);
  }
  }
  
  

}
