import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Global} from '../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public localStorageUser;
  public url: String;
  constructor(
  	private _router: Router,
  	) {
    this.url = Global.url;
     }


  ngOnInit() {
    if (localStorage.getItem("usuario")) {
		this.localStorageUser = JSON.parse(localStorage.getItem("usuario"));
  	console.log(this.localStorageUser._id);
    
   
  	}else{
  	//	this._router.navigate(['/']);
  	}
  }


  cerrarSecion(){
	localStorage.clear();
  //localStorage.removeItem("usuario");
  	console.log(this._router.navigate(['/']));
  }

  showlist(DomOption){
    var option = document.getElementById(DomOption);
    let options = ["listhome","listPerfil","listNotificaciones"];
    for (var i = 0; i <= options.length-1; i++) {
      if (DomOption!=options[i]) {
          document.getElementById(options[i]).style.display="";
      }else{
       if (option.style.display=="") {option.style.display='block';}
       else{option.style.display="";}
      }
    }
   
  }

   getComentarios(idPost){

    }




  insertComent(formId){
    
   }
 generarComentarios(response,idPost){
   
  }
 


}
