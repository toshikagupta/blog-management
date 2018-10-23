import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Blogservice } from '../blogservice.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Output() tagarticles=new EventEmitter();
  public tags=[];
  articles:any;
  constructor(private blogservice:Blogservice) { }

  ngOnInit() {
    this.getAllTags();
  }
  getAllTags()
  {
    this.blogservice.getAllTags().subscribe((data:any)=>{
      this.tags=data.tags
    });
    
  }
  filtertag(tag)
  {
    this.blogservice.gettagArticles(tag).subscribe((data:any)=>{
     this.articles=data.articles
     this.tagarticles.emit({event:data.articles})
    })
  }

}
