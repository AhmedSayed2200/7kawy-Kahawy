import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../card-coments/services/comments.service';
import { Icomments } from '../card-coments/modules/icomments.interface';
import { IuserDetails } from '../../../../../../../../core/modules/iuser-details.interface';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { IReplies } from '../card-coments/modules/ireplies.interface';

@Component({
selector: 'app-replies',
  imports: [PickerComponent,  FormsModule, ReactiveFormsModule],
  templateUrl: './replies.component.html',
  styleUrl: './replies.component.css',
})
export class RepliesComponent {

 postText:string=""
showEmojiPicker: boolean = false;
 imgFileComment!:File;
 imgUrlComment:string | ArrayBuffer | null | undefined;
  userDetails!:IuserDetails;
 @Output() reRepliesList:IReplies[]=[];
 @Output() eventEmitter=new EventEmitter<string>();
  @Input({required:true})comment!:Icomments;
  commentContent:FormControl=new FormControl("");
ngOnInit(): void {
   this.userDetails = JSON.parse(localStorage.getItem("user data")!);
}
 private readonly commentsService =inject(CommentsService);
addEmojii(event: any) {
    this.postText += event.emoji.native;
  }
    imgComment(el :Event){
      const imgElement= el.target as HTMLInputElement;
    if(imgElement.files)
        this.imgFileComment = imgElement.files[0];
      console.log(this.imgFileComment);
       const fileReader= new FileReader(); 
       fileReader.readAsDataURL(this.imgFileComment);
       fileReader.onload = (e)=>{
        this.imgUrlComment= e.target?.result
       }
  }
  
  sendComment(el:Event,postId:string,commentId:string) {
    el.preventDefault();
    const fromElement= el.target as HTMLFormElement;
    const formData=new FormData();
    if(this.commentContent.value){
      console.log(this.commentContent.value)
    formData.append("content",this.commentContent.value);}
      if(this.imgFileComment){
        console.log(this.imgFileComment);
    formData.append("image",this.imgFileComment);
      }

      this.creatReply(postId,commentId,fromElement,formData);
      
  }
  creatReply(postId:string,commentId:string,form:HTMLFormElement,formData:FormData) {
    this.commentsService.createReply(postId,commentId,formData).subscribe({
      next: (res)=>{
          console.log(res);
           
        },
        error: (err)=>{
          console.log(err);
        },
        complete: ()=>{
          this.EmitterNow();
          this.imgUrlComment="";
          form.reset();
        }  
    })


  }


  recallReplies(postId:string,commentId:string){
    this.commentsService.getCommentReplies(postId,commentId).subscribe({
      next: (res)=>{
        console.log(res);
        this.reRepliesList=res.data.replies;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  EmitterNow(){
    this.eventEmitter.emit("Now");
  }
   
}
