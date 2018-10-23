import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {Blogservice} from './blogservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
 
  constructor(private blogservice:Blogservice, private route:Router,private active:ActivatedRoute)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
  checkLogin()
  {
    if(this.blogservice.getToken())
    {
      console.log("token in guard"+this.blogservice.getToken());
      return true;
    }
    else{
      console.log("not logged in")
      this.route.navigate(['./users/login'])
      return false;
    }
  }
}
