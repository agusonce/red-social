import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: String;
	public pass: String;
  public url: String;
  public mensaje: String;
  public status: Boolean;
	public localStorageUser;

  constructor(
  	private _userService: UserService,
    private _router: Router
  ) { 
  	this.url = Global.url;
    this.user = "";
    this.pass = "";
    this.mensaje = "Usuario o contraseña Incorrecta";
    this.status = false;
    this.localStorageUser = false;
  }

  ngOnInit() {
    if (localStorage.getItem("usuario")) {
      this._router.navigate(['/home']);
    }
  }

  onSubmit(Form) {
    console.log(Form);
    console.log(this.user);
    this._userService.validarUser(this.user, this.pass).subscribe(
      response =>{
        var resultado = response;
            console.log(resultado.user.length);

        if (resultado.user.length>0) {
            console.log(response.user[0]);            
            localStorage.setItem("usuario", JSON.stringify(response.user[0]));                     
            this.status = false;
            this.localStorageUser = response.user[0];
            this._router.navigate(['/home']);
        }else{
            console.log("no response");
          this.status = true;
        }

      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
/*

 */
