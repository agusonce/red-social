import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//componentes
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatePostComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    PublicacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

//import * as $ from 'jquery';
import { SliderComponent } from './components/slider/slider.component';
@NgModule({
  declarations: [
    AppComponent,
    SobremiComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    SliderComponent

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


*/