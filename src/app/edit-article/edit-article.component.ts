import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { Blogservice } from '../blogservice.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  editArticleForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    taglist:new FormControl('')
  });
  updateClicked: boolean;
  oldArticle
  slug
  tags=[];
  errorarr=[];
  
  constructor(private formBuilder: FormBuilder, private blogservice:Blogservice,
    private routes:Router, private active:ActivatedRoute) {
    
    this.active.params.subscribe( params => {
      this.slug = params.slug
     
  });
  
   
    }
   

  ngOnInit() {
    this.blogservice.getBlog(this.slug).subscribe((data:any)=>{
      console.log(data.article);
      this.editArticleForm.controls['title'].setValue(data.article.title); 
      this.editArticleForm.controls['body'].setValue(data.article.body);
      this.editArticleForm.controls['description'].setValue(data.article.description);
      this.tags=data.article.tagList;

      
  });
   
  }
  editArticle()
  {
   
    this.blogservice.editArticle(this.slug,{
      article:{
        title:this.editArticleForm.value.title,
           body:this.editArticleForm.value.body,
           description:this.editArticleForm.value.description,
           tagList: this.tags
      }}
    ).subscribe((data:any)=>{
    console.log(data.article);
     //this.routes.navigate(['article'+this.slug]);
     
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
  
  

}
