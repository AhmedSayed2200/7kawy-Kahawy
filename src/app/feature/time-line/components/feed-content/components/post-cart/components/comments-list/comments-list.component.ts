import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../card-coments/services/comments.service';
import { CardComentsComponent } from '../card-coments/card-coments.component';
import { Icomments } from '../card-coments/modules/icomments.interface';


@Component({
  selector: 'app-comments-list',
  imports: [CardComentsComponent],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css',
})
export class CommentsListComponent implements OnInit  {
   @Input({required:true}) postId!:string; 
  @Input() updatedList!:Icomments[];
  private readonly CommentsService= inject(CommentsService);
  commentsList:Icomments[]=[];
  ngOnInit(): void {
     this.getPostComments(this.postId)
  }

  ngOnChanges(): void {
      if(this.updatedList &&this.updatedList.length){
        this.commentsList=[...this.updatedList];
      }
  }

  getPostComments(postId:string){
        this.CommentsService.getPostsComments(postId).subscribe({
      next: (res)=> {
       this.commentsList=res.data.comments;
       console.log(res);
      },
      error: (err)=> {
        console.log(err);
      }
    })
    
  }
}
