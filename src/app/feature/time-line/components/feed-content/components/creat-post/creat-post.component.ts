import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { PostsService } from '../../../../../../core/services/posts.service';
import { Iposts } from '../../../../../../core/modules/iposts.interface';
import { IuserDetails } from '../../../../../../core/modules/iuser-details.interface';

@Component({
  selector: 'app-creat-post',
  imports: [PickerComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './creat-post.component.html',
  styleUrl: './creat-post.component.css',
})
export class CreatPostComponent {
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();
  postText:string="";
  imgFile!:File;
  imgUrl:string | ArrayBuffer | null | undefined;
  postList:Iposts[]=[];
  userDetails:IuserDetails=JSON.parse(localStorage.getItem("user data")!)

   bodyContent:FormControl=new FormControl("");
   privacy:FormControl=new FormControl("public");

   private readonly postsService=inject(PostsService)
  addEmoji(event: any) {
    this.postText += event.emoji.native;
  }

  saveImage(element:HTMLInputElement){
    console.log(element);
    if(element.files){
        this.imgFile= element.files[0];
        const fileReader=new FileReader();
        fileReader.readAsDataURL(this.imgFile);
        fileReader.onload = (e) => {
          this.imgUrl= e.target?.result;
        }  
    }
  }

  sendData(e:Event,form:HTMLFormElement){
    e.preventDefault();
    const formData=new FormData();
    if(this.bodyContent.value){
    formData.append("body",this.bodyContent.value);}
    if(this.privacy.value){
    formData.append("privacy",this.privacy.value);}
    if(this.imgFile){
    formData.append("image",this.imgFile);
    }
    this.creatPost(formData,form);
  }
  
  creatPost(body:object,form:HTMLFormElement){
    this.postsService.creatPosts(body).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        form.reset();
        this.imgUrl = "";
         this.fireEvent()
      }
    })
  }

    getAllPosts(){
    this.postsService.getallposts(1).subscribe({
      next:(res) => {
        this.postList = res.data.posts
        console.log(this.postList);
       

      },
      error:(err) => {
        console.log(localStorage.getItem("social token"))
        console.log(err);
      }
    })
  }
  
  fireEvent(){
      this.eventEmitter.emit("now");
  }
}
