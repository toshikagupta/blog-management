import { Component, OnInit, Input } from '@angular/core';
import { article } from '../article';
import {Blogservice} from '../blogservice.service';
import{ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-blog-component',
  templateUrl: './blog-component.component.html',
  styleUrls: ['./blog-component.component.css']
})
export class BlogComponent implements OnInit {
 
  
  favouriteCount:any
  favoriteClicked
  fav
  loggedIn;
  
 
  @Input()
  articles:any;
  
  date:any
  
  constructor(private blogservice:Blogservice, private route:ActivatedRoute, private router:Router) {
    this.favoriteClicked=false;
    
   }
  
  ngOnInit() {
    
    console.log("art"+this.articles.favorited);
    this.favoriteClicked=this.articles.favorited;
    this.date=new Date(this.articles.updatedAt).toDateString();
    this.loggedIn=window.localStorage.getItem("tokenVal");
    

  }
  favourite(slug,article)
  {
    if(this.loggedIn)
   { this.blogservice.favouriteArticle(slug,article).subscribe((data:any)=>
    this.articles=data.article

    
    )
   }
   else
   {
     this.router.navigate(['users/login']);
   }
    //this.favoriteClicked=true;
   }
    Unfavourite(slug)
    {
      if(this.loggedIn)
     { this.blogservice.unfavouriteArticle(slug).subscribe((data:any)=>
      this.articles=data.article
      )
     }
     else
     {
      this.router.navigate(['users/login']);
     }
     // this.favoriteClicked=false;
    }
  
    
  }
  


  
  


