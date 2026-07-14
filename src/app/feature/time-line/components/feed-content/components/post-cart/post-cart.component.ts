import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { PostsService } from '../../../../../../core/services/posts.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { NgClass } from '@angular/common';
import { CardComentsComponent } from './components/card-coments/card-coments.component';
import { CommentsListComponent } from "./components/comments-list/comments-list.component";
import { CommentsService } from './components/card-coments/services/comments.service';
import { Icomments } from './components/card-coments/modules/icomments.interface';
import { Iposts } from '../../../../../../core/modules/iposts.interface';

@Component({
  selector: 'app-post-cart',
  imports: [PickerComponent, CardComentsComponent, NgClass, FormsModule, ReactiveFormsModule, CommentsListComponent],
  templateUrl: './post-cart.component.html',
  styleUrl: './post-cart.component.css',
})
export class PostCartComponent {
  first:boolean=true
   userId: string='';
   postText:string="";
   imgFileComment!:File;
   imgUrlComment:string | ArrayBuffer | null | undefined;
  isChecked:boolean = false;
   showEmojiPicker: boolean = false;
   commentList:Icomments[]=[]
 @Input({required:true}) post!:Iposts;
   private readonly postsService=inject(PostsService);
  private readonly commentsService =inject(CommentsService)
   @Output() eventEmitter: EventEmitter<string> = new EventEmitter();
  
   ngOnInit(): void {
    this.userId=JSON.parse(localStorage.getItem("user data")!)?._id;    
  }

 

  commentContent:FormControl=new FormControl("");


  deletePost(postId :string){
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete: ()=>{
         this.onFireEvent();
      }
    })
  }

  
  onFireEvent(){
    this.eventEmitter.emit("now");
  }

addEmojii(event: any) {
    this.postText += event.emoji.native;
  }

  imgComment(el:HTMLInputElement){
    if(el.files)
        this.imgFileComment = el.files[0];
      console.log(this.imgFileComment);
       const fileReader= new FileReader(); 
       fileReader.readAsDataURL(this.imgFileComment);
       fileReader.onload = (e)=>{
        this.imgUrlComment= e.target?.result
       }
  }
  
  sendComment(el:Event,form:HTMLFormElement,postId:string) {
    el.preventDefault();

    const formData=new FormData();
    if(this.commentContent.value){
      console.log(this.commentContent.value)
    formData.append("content",this.commentContent.value);}
      if(this.imgFileComment){
        console.log(this.imgFileComment);
    formData.append("image",this.imgFileComment);
      }

      this.creatComment(postId,form,formData);
      
  }
  creatComment(postId:string,form:HTMLFormElement,formData:FormData) {
       this.commentsService.creatComment(postId,formData).subscribe({
        next: (res)=>{
          console.log(res);
          this.reCallcomments(postId);
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

  reCallcomments(postId:string){
    this.commentsService.getPostsComments(postId).subscribe({
      next: (res)=>{
        this.commentList=res.data.comments
        this.post.commentsCount++;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}



