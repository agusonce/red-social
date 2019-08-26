import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Global } from '../../services/global';
import { PostService } from '../../services/post.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [PostService, UploadService]
})
export class CreatePostComponent implements OnInit {
	public localStorageUser; 
	public post: Post;
  public filesToUpload: Array<File>;
  constructor(
    private _postService: PostService,
  	private _router: Router,
  	private _route: ActivatedRoute,
    private _uploadService: UploadService    
	) {
  		this.post = new Post('','','','');
	 }

  ngOnInit() {
  	if (localStorage.getItem("usuario")) {
		//console.log("existe");
		this.localStorageUser = JSON.parse(localStorage.getItem("usuario"));
    //console.log(this.localStorageUser._id);
    this.post.titular = this.localStorageUser._id;

  	}else{
		console.log("no existe");  		
  		this._router.navigate(['/']);
  	}
  }

  cerrarSecion(){
	localStorage.clear();
  	this._router.navigate(['/']);
  }

  savePost(form){
      console.log(this.post);
      //guardar los datos
      this._postService.savePost(this.post).subscribe(
          response =>{
            var resultado = response;
            console.log(resultado);
            if (resultado.post) {
                   //subir imagen
                if (this.filesToUpload) {

                    this._uploadService.makeFileRequest(Global.url+"uploadImgPost/"+response.post._id, [], this.filesToUpload,'image')
                    .then((result:any) => {

                        console.log(result);
                        form.reset();

                    });

                }else{
                    console.log("no hay imagen");
                }
               //en subir imagen

            }else{
            }
          },
          error =>{
            console.log(<any>error);
          }
        );

  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
