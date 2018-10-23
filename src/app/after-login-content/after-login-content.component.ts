import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
@Component({
  selector: 'app-after-login-content',
  templateUrl: './after-login-content.component.html',
  styleUrls: ['./after-login-content.component.css']
})
export class AfterLoginContentComponent implements OnInit {

  articles:any;
  constructor(private blogservice:Blogservice) { }

  ngOnInit() {
    this.getMyFeed();
  }
  getMyFeed()
  {
     this.blogservice.getFeedArticles().subscribe((data:any)=>{
      this.articles=data.articles;
    });
  }
  getGlobalFeed()
  {
    this.blogservice.getAllBlog().subscribe((data:any)=>{
      this.articles=data.articles
    });
  }

}
