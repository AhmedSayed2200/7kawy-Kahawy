import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { PostsService } from '../../../../../../core/services/posts.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DatePipe, NgClass } from '@angular/common';
import { CardComentsComponent } from './components/card-coments/card-coments.component';
import { CommentsListComponent } from "./components/comments-list/comments-list.component";
import { CommentsService } from './components/card-coments/services/comments.service';
import { Icomments } from './components/card-coments/modules/icomments.interface';
import { Iposts } from '../../../../../../core/modules/iposts.interface';
import { LikesComponent } from './components/likes/likes.component';
import { IuserDetails } from '../../../../../../core/modules/iuser-details.interface';

@Component({
  selector: 'app-post-cart',
  imports: [PickerComponent,LikesComponent, CardComentsComponent, NgClass, FormsModule, ReactiveFormsModule, CommentsListComponent,DatePipe],
  templateUrl: './post-cart.component.html',
  styleUrl: './post-cart.component.css',
})
export class PostCartComponent {
   userId: string='';
   userDetails!:IuserDetails;
   postText:string="";
   imgFileComment!:File;
   imgUrlComment:string | ArrayBuffer | null | undefined;
   showEmojiPicker: boolean = false;
   isclicked:boolean = false;
   isLikeChecked:boolean = false;
   isLikedBefore:boolean = false;
   first:boolean=true;
   isBookMarkChecked:boolean = false; 
   commentList:Icomments[]=[]
 @Input({required:true}) post!:Iposts;
 @Input() isFromBookmarks:boolean=false;
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();
  @Output() EventEmitterBookmarks: EventEmitter<string> = new EventEmitter();
   private readonly postsService=inject(PostsService);
  private readonly commentsService =inject(CommentsService)
  
   ngOnInit(): void {
   
    this.userDetails =JSON.parse(localStorage.getItem("user data")!);
     this.userId= this.userDetails._id;
    this.post.likes.forEach((userLikedId)=>{
        if(userLikedId== this.userId){
          this.isLikedBefore=true;
        }
    })
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
  
  displayLinkList(){
    this.isclicked=true;
  }
         
    closeLinkList(){
    this.isclicked=false;
  }
    
  likeUnlike(postId:string){
    this.postsService.likeUnLink(postId).subscribe({
      next: (res)=>{
        console.log(res);
        this.post.likesCount=res.data.likesCount;
         console.log( this.post.likesCount)
      },
      error:(err)=>{
        console.log(err)
      },
      complete: ()=>{
        this.isLikeChecked = !this.isLikeChecked;
      }
    })
  }

    bookmarkUnBookmark(postId:string){
    this.postsService.bookmarkUnBookmark(postId).subscribe({
      next: (res)=>{
        console.log(res);
        if(this.isFromBookmarks)
           this.EventEmitterBookmarks.emit("now");
        this.isBookMarkChecked=! this.isBookMarkChecked;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}


