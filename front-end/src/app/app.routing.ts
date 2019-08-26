import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'crear-post', component: CreatePostComponent},
	{path: 'publicaciones', component: PublicacionesComponent},
	{path: 'home', component: HomeComponent}
];


 export const appRoutingProviders: any[] = [];
 export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);