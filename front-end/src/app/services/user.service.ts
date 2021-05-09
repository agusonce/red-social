import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}


	testService(){
		return 'probando el servicio de angular';
	}

  validarUser(user: String ,pass:String):Observable<any>{
    let params = {user: user, pass:pass};
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'/getUser',params,{headers: headers});
  }

  getDataUser(idUser: String):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = {id: idUser};

    return this._http.post(this.url+'/getDataUser', params,{headers: headers});

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
