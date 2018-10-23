import { Component, Input } from '@angular/core';
import {Blogservice} from './blogservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogManagement';
  
  constructor(private blogservice:Blogservice){}
  ngOnInit() {
    
    
  }
}
