import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import * as Rx from "rxjs";
import { Options } from 'selenium-webdriver/safari';

const subject = new Rx.ReplaySubject(2,100);
const name=new Rx.ReplaySubject(2,100);


@Injectable({
  providedIn: 'root'
})

export class Blogservice {
  auth;
   tokenVal=window.localStorage.getItem('tokenVal');
 headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Token '+this.tokenVal });
 options = { headers: this.headers };

  BASE_URL="https://conduit.productionready.io/api";
  constructor(private http:HttpClient) { }

  updateHeader(){
    
    this.tokenVal=window.localStorage.getItem('tokenVal');
    //console.log("tokenVal")
    //console.log(this.tokenVal)
    this.headers=new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':'Token '+this.tokenVal
    });
     this.options={headers:this.headers};
    
      }

  getAllBlog()
  {
    return this.http.get( this.BASE_URL+'/articles');
  }
  getBlog(slug)
  {
    return this.http.get(`${this.BASE_URL}/articles/${slug}`);
  }
  getAllTags()
  {
    return this.http.get(this.BASE_URL+'/tags');
  }
  register(user)
  {
     return this.http.post(this.BASE_URL+'/users',user);
      }
  saveToken(token)
      {
        window.localStorage.setItem('tokenVal',token);
      }
      getToken()
      {
        return window.localStorage.getItem('tokenVal');
      }
      authenticateUser(user)
      {
        return this.http.post(this.BASE_URL+'/users/login',user);
      }
      getUser(user)
      {
        if(!this.getToken())
        return this.http.get(this.BASE_URL+'/profiles/'+user);
        else
        return this.http.get(this.BASE_URL+'/profiles/'+user,this.options);
      }
      getMyArticles(username)
      {
        
        return this.http.get(this.BASE_URL+'/articles?author='+username);
      }
      getFavouriteArticles(username)
      {
        return this.http.get(this.BASE_URL+'/articles?author='+username);
      }
      getSubject()
      {
        return subject;
      }
      createArticles(article)
      {
        return this.http.post(this.BASE_URL+'/articles',article,this.options);
      }
      getCurrentUser()
      {
        //console.log("options:")
        //console.log(this.options)
        return this.http.get(this.BASE_URL+'/user',this.options);
      }
      updateSubject()
      {
        
        subject.next(window.localStorage.getItem('tokenVal'));
      }
      updateSubjectName(){
        console.log("current user"+this.getCurrentUser());
        return this.getCurrentUser();
        } 
        updateUser(user)
        {
          return this.http.put(this.BASE_URL+'/user',user,this.options);
        }
        postComment(slug,comment)
        {
          return this.http.post(this.BASE_URL+'/articles/'+slug+'/comments', comment,this.options);
        }
        getFeedArticles()
        {
          return this.http.get(this.BASE_URL+'/articles/feed',this.options);
        }
        deleteArticle(slug)
        {
          return this.http.delete(this.BASE_URL+'/articles/'+slug, this.options);
        }
        favouriteArticle(slug,article)
        {
          return this.http.post(this.BASE_URL+'/articles/'+slug+'/favorite',{}, this.options);
        }
        unfavouriteArticle(slug)
        {
          return this.http.delete(this.BASE_URL+'/articles/'+slug+'/favorite', this.options);
        }
        getAllComments(slug)
        {
          return this.http.get(this.BASE_URL+'/articles/'+slug+'/comments')
        }
        deleteComment(slug,commentid)
        {
          return this.http.delete(this.BASE_URL+'/articles/'+slug+'/comments/'+commentid, this.options);
        }
        getMyFavouriteArticles(username)
        {
           return this.http.get(this.BASE_URL+'/articles?favorited='+username );
        }
        makeFeedsRequestonPages(offset)
        {
          return this.http.get(this.BASE_URL+'/articles?offset='+offset);
        }
        editArticle(slug, article)
        {
          return this.http.put(this.BASE_URL+'/articles/'+slug,article,this.options);  
          
        }
        populatedService()
        {
           if(this.getToken())
           {
             this.getCurrentUser().subscribe((data:any)=>
              {
                 this.auth=data.user.username;
              })
           }
           else{
               window.localStorage.delete('tokenVal');
           }
        }
        followUser(username)
        {
          return this.http.post(this.BASE_URL+'/profiles/'+username+'/follow',{},this.options);
        }
        UnfollowUser(username)
        {
          return this.http.delete(this.BASE_URL+'/profiles/'+username+'/follow',this.options);
        }
        gettagArticles(tag){
          return this.http.get(`${this.BASE_URL}/articles?tag=${tag}`);
        }
      
        
     
      
}
