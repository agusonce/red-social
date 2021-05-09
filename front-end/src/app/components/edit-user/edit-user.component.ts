import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { DataUser } from '../../models/dataUser';
import { Global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [ UploadService,UserService]
})
export class EditUserComponent implements OnInit {
	public localStorageUser; 
  public data: String;
  public url: String;
  public post: Post;
	public DataUser: DataUser;
  public filesToUpload: Array<File>;
  constructor(
  	private _router: Router,
  	private _route: ActivatedRoute,
    private _uploadService: UploadService,
    private _userService: UserService

	) {
  		this.post = new Post('','','','');
      this.data = "hola";
      this.url = Global.url;

	 }

  ngOnInit() {
  	if (localStorage.getItem("usuario")) {
		  this.localStorageUser = JSON.parse(localStorage.getItem("usuario"));
      this.post.titular = this.localStorageUser._id;
      this.getDatosUser();
  	}else{
  		this._router.navigate(['/']);
  	}
  }

  cerrarSecion(){
	localStorage.clear();
  	this._router.navigate(['/']);
  }

    getDatosUser(){
    this._userService.getDataUser(this.localStorageUser._id).subscribe(
      response => {
        if(true){
          this.DataUser = response.user[0].data[0];

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
