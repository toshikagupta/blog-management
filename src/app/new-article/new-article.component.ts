import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  createArticle: FormGroup;
  updateClicked: boolean;
  tags=[];
  errorarr=[]
  
  constructor(private formBuilder: FormBuilder, private blogservice:Blogservice,
    private routes:Router) {
    this.createArticle = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      description: ['', Validators.required],
      tagList:['',Validators.nullValidator]
      }
    );
    this.updateClicked = false;
  }

  ngOnInit() {
  }
  saveArticle()
  {
    console.log("tag value "+this.tags);
    this.blogservice.createArticles({
      article:{
        title:this.createArticle.value.title,
           body:this.createArticle.value.body,
           description:this.createArticle.value.description,
           tagList: this.tags
      }}
    ).subscribe((data:any)=>{
    console.log(data.article);
     this.routes.navigate(['']);
     
    },
    err =>{
      const errors = err.error.errors;
      for(var key in errors){
        const msgs = errors[key];
        // cons
        if(errors.hasOwnProperty(key)){
          for(let i=0;i<msgs.length;i++){
            this.errorarr.push(`${key} : ${msgs[i]}`);
          }
        }
      }
    }
    );
  }
  addTags(newTag: string) {
    if (newTag) {
      this.tags.push(newTag);
    }
  }

}
