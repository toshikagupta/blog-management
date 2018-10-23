import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {Blogservice} from '../blogservice.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  public articles=[];
 range=Array(50).fill(4);
  
  
  constructor(private blogservice:Blogservice){
  }
  ngOnInit() {
    this.getAllBlog();
  }
  getAllBlog()
  {
    this.blogservice.getAllBlog().subscribe((data:any)=>{
      this.articles=data.articles
     
    });
    
  }
  nextPage(j) 
  {
    
    this.blogservice.makeFeedsRequestonPages(j*20).subscribe((data:any)=>
    {
      this.articles=data.articles;
    })
  }
  display($e:any)
  {
   this.articles=$e.event;
  }
  
  
}
