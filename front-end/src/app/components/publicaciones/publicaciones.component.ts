import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Comentario } from '../../models/comentario';
import { Comentarios } from '../../models/comentarios';
import { Global} from '../../services/global';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  providers: [PostService]
})



export class PublicacionesComponent implements OnInit {
public localStorageUser;
	public posts: Post;
  public url: String;
  public comenterioDoms: Comentarios;
  public comentario: Comentario;
  public comentarios: Comentario;
  public comentarioPost: Array<String>;
  constructor(
  	private _router: Router,
  	private _postService: PostService
  	) {
    this.comentarioPost = ["primero"];
    this.url = Global.url;
     }

  ngOnInit() {
  	if (localStorage.getItem("usuario")) {
		this.localStorageUser = JSON.parse(localStorage.getItem("usuario"));
		this.getPosts();
    this.comentario = new Comentario('','','','');
    this.comentario.titular = this.localStorageUser._id;
  	}else{
  	//	this._router.navigate(['/']);
  	}
  }

  cerrarSecion(){
	localStorage.clear();
  	console.log(this._router.navigate(['/']));
  }

  getPosts(){
  	this._postService.getPosts().subscribe(
  		response => {
  			if(response.posts){
				this.posts = response.posts;
          console.log(response);
          console.log("aqui",response.posts[0]);
	  			console.log(response.posts[0].usuario[0].imagen);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
  

  likeValidation(likes,postId){
   // console.log("likeValidation: ",likes);
    for (var i = 0; i<= likes.length; i++) {
      if (likes[i]) {
        if (likes[i].authorId == this.comentario.titular) {
          let a = document.getElementById(postId+"_like");

          a.style.color="blue";
          return true;
        }else{
          console.log("no esta");
          return false;
        }
      }
    }
  }

   clickComentarios(idPost){

      console.log(idPost);
      if(this.comenterioDoms){
          if(this.comenterioDoms.comentarios[0].post == idPost){
                      this.comenterioDoms = null;
          }else{
            this.getComentarios(idPost);
          }

      }else{
        this.getComentarios(idPost);
      }

    }
  
   getComentarios(idPost){
    console.log("idPost: ",idPost);
    this._postService.getComentarios(idPost).subscribe(
      response => {
          this.comentarios = response;
          this.comenterioDoms = response;
      },
      error => {
        console.log(<any>error);
      }
    );

    }



 setLike(idPost){
    console.log(idPost);
    console.log(this.comentario.titular);
    let a = document.getElementById(idPost+"_like");
    
    console.log("vacio:||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ");
    console.log("vacio: ",a);

    this._postService.updateLikes(idPost,this.comentario.titular).subscribe(
          response => {
                if (a.style.color=="blue") {
                  a.style.color="";
                  console.log("vacio");
                }else{
                  a.style.color="blue";
                  console.log("blue");

                }
          //console.log(response);
        },
        err => {
          //console.log(<any>err);
        }
      );
 
 }

  insertComent(formId){
    var form : any = document.getElementById(formId);
    this.comentario.comentario = form.comentario.value;
    this.comentario.post = formId;
    console.log(this.comentario);

    this._postService.insertComentario(this.comentario).subscribe(
          response => {
          console.log(response);
          form.comentario.value = "";
          this.getComentarios(this.comentario.post);
        },
        err => {
          console.log(<any>err);
        }
      );
   }

 


}
