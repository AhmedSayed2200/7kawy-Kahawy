import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Icomments } from './modules/icomments.interface';

@Component({
  selector: 'app-card-coments',
  imports: [],
  templateUrl: './card-coments.component.html',
  styleUrl: './card-coments.component.css',
})
export class CardComentsComponent {
 @Input({required:true}) comment!:Icomments;

 isLiked:boolean=false;

}
