import { Component, OnInit } from '@angular/core';
import {Blogservice} from '../blogservice.service';
import{ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  d:any;
  display:any;
  username:any;
  constructor(private blogservice:Blogservice){
    this.display=true;
  }
  
  ngOnInit() {
    
   this.blogservice.getSubject().subscribe((data:any)=>
   {
     
    if(data)
    {
      console.log(data)
       this.display=false;
       this.blogservice.getCurrentUser().subscribe((data:any)=>{
        this.username=data.user.username;
       }
    
       );
    }
    else{
      this.display=true;
    }
    
    }
    
   );
  
  
   this.blogservice.updateSubject();
  

  }
 
  
 

}
