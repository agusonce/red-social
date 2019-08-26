import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Comentario } from '../../models/comentario';
import { Global} from '../../services/global';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

public localStorageUser;
	public posts: Post;
  public url: String;
  public comentario: Comentario;
  public comentarios: Comentario;
  constructor(
  	private _router: Router,
  	private _postService: PostService
  	) {

    this.url = Global.url;
     }

  ngOnInit() {
  	
  }

 

}
