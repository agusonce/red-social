import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Comentario } from '../models/comentario';
import { Global } from './global';

@Injectable()
export class PostService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}


	testService(){
		return 'probando el servicio de angular';
	}


  savePost(post: Post):Observable<any>{
      let params = JSON.stringify(post);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      console.log(params);
      console.log("params");
      return this._http.post(this.url+'save-Post', params, {headers: headers}); 
  }

  updateLikes(postId,userId):Observable<any>{
      let params = JSON.stringify({"postId" : postId,"userId" : userId});
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.post(this.url+'Tes-insert-Like', params, {headers: headers}); 
  }
  getPosts():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'get-Posts', {headers: headers});

  }
 
 insertComentario(comentario: Comentario):Observable<any>{
    let params = JSON.stringify(comentario);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      console.log(params);
      console.log("params");
      return this._http.post(this.url+'inserComentario', params, {headers: headers}); 
 }

 getComentarios(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getComentario/'+id, {headers: headers});

 }
/*
	saveProject(project: Project):Observable<any>{
  		let params = JSON.stringify(project);
  		let headers = new HttpHeaders().set('Content-Type', 'application/json');
  		console.log(params);
  		console.log("params");
  		return this._http.post(this.url+'save-proyec', params, {headers: headers}); 
  }

  getProjects():Observable<any>{
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');

  	return this._http.get(this.url+'projects', {headers: headers});

  }

  getProject(id):Observable<any>{
  		let headers = new HttpHeaders().set('Content-Type', 'application/json');

	  	return this._http.get(this.url+'project/'+id, {headers: headers});

  }

	   deleteProject(id):Observable<any>{
  		let headers = new HttpHeaders().set('Content-Type', 'application/json');

	  	return this._http.delete(this.url+'projectDelete/'+id, {headers: headers});

  	}  

    UpdateProject(project):Observable<any>{
      let params = JSON.stringify(project);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._http.put(this.url+'projectUpdate/'+project._id, params,{headers: headers});

    }  
*/
}
