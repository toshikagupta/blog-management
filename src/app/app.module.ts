import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BlogComponent } from './blog/blog-component.component';
import { TagsComponent } from './tags/tags.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';

import { FavouriteArtComponent } from './favourite-art/favourite-art.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SettingComponent } from './setting/setting.component';
import {AuthguardGuard } from './authguard.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AfterLoginContentComponent } from './after-login-content/after-login-content.component'

import { EditArticleComponent } from './edit-article/edit-article.component'


const routes:Routes=[
  {path:'app' , component:AppComponent},
  {path: '', component: HomeContentComponent},
  {path:'afterloginpage',component:AfterLoginContentComponent},
  {path: 'article/:slug', component: SingleArticleComponent},
  {path: 'users', component:SignupComponent},
  {
    path:'users/login',
    component:SigninComponent
  },
  {path:'profiles/:username', component:UserComponent},
  {path:'new-article' , 
  //canActivate:[AuthguardGuard],
  component:NewArticleComponent},
  {path:'setting' ,
  canActivate:[AuthguardGuard],
   component:SettingComponent},
   {
     path:'userprofile',
     component:UserprofileComponent
   },
   {
     path:'editArticle/:slug',
     component:EditArticleComponent
   }
  
];
@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    BlogComponent,
    TagsComponent,
    SingleArticleComponent,
    HomeContentComponent,
    SignupComponent,
    SigninComponent,
    FooterComponent,
    UserComponent,
    FavouriteArtComponent,
    
    NewArticleComponent,
    
    SettingComponent,
    
    UserprofileComponent,
    
    AfterLoginContentComponent,
    
    EditArticleComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
