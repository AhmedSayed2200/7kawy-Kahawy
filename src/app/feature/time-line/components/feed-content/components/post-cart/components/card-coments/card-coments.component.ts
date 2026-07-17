import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Icomments } from './modules/icomments.interface';
import { initFlowbite } from 'flowbite';
import { DatePipe } from '@angular/common';
import { IReplies } from './modules/ireplies.interface';
import { IuserDetails } from '../../../../../../../../core/modules/iuser-details.interface';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepliesComponent } from "../replies/replies.component";

@Component({
  selector: 'app-card-coments',
  imports: [DatePipe, PickerComponent, FormsModule, ReactiveFormsModule, RepliesComponent],
  templateUrl: './card-coments.component.html',
  styleUrl: './card-coments.component.css',
})
export class CardComentsComponent implements OnInit {
 @Input({required:true}) comment!:Icomments;
 @Output() eventEmitterComment=new EventEmitter<string>();
  @Output() eventEmitterReplies=new EventEmitter<string>();
 private readonly commentsService=inject(CommentsService)
userId:string="";
 isLikeClicked:boolean=false;
 isLikedBefore:boolean=false;
 IsDisplayReplies:boolean=false;
 isEditaing:boolean=false;
 contentComment:string="";
 repliesList:IReplies[]=[];
  userDetails!:IuserDetails;
  imgFileComment!:File;
  imgUrlComment:string | ArrayBuffer | null | undefined;
 commentContentEditing:FormControl=new FormControl("");
ngOnInit(): void {
   this.userDetails = JSON.parse(localStorage.getItem("user data")!);
   this.userId=this.userDetails._id;
  this.comment.likes.forEach(likeCreaterId => {
      if(likeCreaterId == this.userId){
        this.isLikedBefore = true;
  }
  })
  console.log(this.userId);
  
}

emitRelies(){
  this.eventEmitterReplies.emit("now");
}
  
    deleteCommet (postId:string,CommentId:string,commentParent:string|null):void {
      this.commentsService.deleteComment(postId,CommentId).subscribe({
        next: (res)=>{
          console.log(res);
          //  this.emitterNow();
          if(!commentParent){
               this.emitterNow();
               
              }
              else{
               this.emitRelies();
              }
        },
        error: (err)=>{
          console.log(err); 
        }
      })
    }

    emitterNow(){
      this.eventEmitterComment.emit("now");
    }
    likeUnLinkComment(postId:string,commentId:string):void{
       this.commentsService.likeUnLinkComment(postId,commentId).subscribe({
        next: (res)=>{
          console.log(res);
          this.isLikeClicked = !this.isLikeClicked;
          if(res.data.liked)
          {
            this.comment.likes.length++
          }
          else{
             this.comment.likes.length--;
          }
        },
        error: (err)=>{
          console.log( err )
        }
       })
    }

    getCommentReplies(postId:string,commentId:string ,isFromChild?:boolean):void{
      if(!this.IsDisplayReplies || isFromChild){
        this.commentsService.getCommentReplies(postId,commentId).subscribe({
        next: (res)=>{
        this.repliesList=res.data.replies;
        console.log(res);
        this.IsDisplayReplies=true;
        this.comment.repliesCount=this.repliesList.length;

        },
        error:(err)=>{
          console.log(err);
        }
      })
      }
      else{
        this.IsDisplayReplies=false;
      }
    }

    editComment(){
       this.contentComment=this.comment.content;
       this.isEditaing=true;
      setTimeout(() => {
     initFlowbite();
   }, 50);
    }
    saveEditing(){
      this.contentComment=this.commentContentEditing.value;
      console.log( this.contentComment);
        this.isEditaing=false;
      
    }
    cancelEditing(){
      this.isEditaing=false;
    }
    write(){
       console.log(this.contentComment);
    }

 imgCommentEditing(el:HTMLInputElement){
    if(el.files)
        this.imgFileComment = el.files[0];
      console.log(this.imgFileComment);
       const fileReader= new FileReader(); 
       fileReader.readAsDataURL(this.imgFileComment);
       fileReader.onload = (e)=>{
        this.imgUrlComment= e.target?.result
        this.comment.image=this.imgUrlComment as string;
       }
  }
  
  sendComment(el:Event,postId:string,commentId:string) {
    el.preventDefault();
    const form =el.target as HTMLFormElement
    const formData=new FormData();
    if(this.commentContentEditing.value){
      console.log(this.commentContentEditing.value)
    formData.append("content",this.commentContentEditing.value);}
      if(this.imgFileComment){
        console.log(this.imgFileComment);
    formData.append("image",this.imgFileComment);
      }

      this.updateComment(postId,commentId,form,formData);
      
  }
  updateComment(postId:string,commentId:string,form:HTMLFormElement,formData:FormData) {
       this.commentsService.updateComment(postId,commentId,formData).subscribe({
        next: (res)=>{
          console.log(res);
         this.comment=res.data.comment;
          
        },
        error: (err)=>{
          console.log(err);
        },
        complete: ()=>{
          this.imgUrlComment="";
          form.reset();
        }
       })

  }

  addEmojiEditing(event: any) {
    this.contentComment += event.emoji.native;
  }
  

}