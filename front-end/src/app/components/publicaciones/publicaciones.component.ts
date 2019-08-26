import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Comentario } from '../../models/comentario';
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
          console.log(response.posts[0]);
	  			console.log(response.posts[0].usuario[0].imagen);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

   getComentarios(idPost){

    this._postService.getComentarios(idPost).subscribe(
      response => {
          this.comentarios = response;
          this.generarComentarios(response,idPost);
          //console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
     // console.log(data);
 //     var form = document.getElementById(data);
      //console.log(form);
   //   console.log(form.comentario.value);

    }




  insertComent(formId){
    var form = document.getElementById(formId);
    this.comentario.comentario = form.comentario.value;
    this.comentario.post = form.post.value;
    console.log(this.comentario);

    this._postService.insertComentario(this.comentario).subscribe(
          response => {
          console.log(response);
        },
        err => {
          console.log(<any>err);
        }
      );
   }
 generarComentarios(response,idPost){
   
 //Varibles
          var newDiv;
          var divComentario;
          var contenido; 
          var form;
          var cssAutor = "padding: 10px; background-color: transparent; margin-bottom: 0px; width: 95%;";
          var cssparrafo = "padding: 10px; background-color: transparent; width: 95%; margin: 0px;";
          var cssComentarios = "background-color: #eee; padding: 10px; display: inline-block; width: 89%; border-radius: 0px 20px 20px 20px; margin-bottom: 5px; margin-left:20px;";
          document.getElementById(idPost).style = "display: block";
        //comentario
          console.log("response");
          console.log(response.comentarios);
          
          
          console.log(this.comentarioPost);
          if (!this.comentarioPost.includes(response.comentarios[0].usuario[0]._id)) {
              this.comentarioPost.push(response.comentarios[0].usuario[0]._id);

            for (var i = 0; i < response.comentarios.length; i++) {
                  //titular
                 newDiv = document.createElement("div");
                 divComentario = document.createElement("div");
                 contenido = document.createTextNode("@"+response.comentarios[i].usuario[0].user); 
                 divComentario.style = cssComentarios;// = "comentarios";
                 newDiv.style = cssAutor;// = "comentarios";
                 newDiv.appendChild(contenido); //añade texto al div creado. 
                 divComentario.insertBefore(newDiv,divComentario[0]); 
                 //comentario
                 newDiv = document.createElement("p");
                 contenido = document.createTextNode(response.comentarios[i].comentario); 
                 newDiv.appendChild(contenido);
                 newDiv.style = cssparrafo;// = "comentarios";
                 divComentario.insertBefore(newDiv,divComentario[0]); 

                 form = document.getElementById(idPost).parentNode;
                 form.insertBefore(divComentario, form.childNodes[0]); 
            }
            
          }
  }
 


}
