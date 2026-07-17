import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PostsService } from '../../../../../../../../core/services/posts.service';
import { Ilinks } from './modules/ilinks.interface';

@Component({
  selector: 'app-likes',
  imports: [],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css',
})
export class LikesComponent {
  @Output()eventEmmitter=new EventEmitter<string>();
  @Input() postId:string=";"
  
  liksList:Ilinks[]=[]
  isOpen:boolean = true;
  isLoading:boolean = true;
  followUnf:string="Follow";
  isFollow:boolean = false;
  private readonly postsService=inject(PostsService)

  ngOnInit(): void {
     this.getLikesPost(this.postId); 
  }
    getLikesPost(postId:string) {
        this.postsService.getLikesPost(postId).subscribe({
          next:(res)=>{
            this.liksList=res.data.likes;
            console.log(this.liksList)
            this.isLoading=false;
          },
          error: (err)=>{
            console.log (err);
          }
      })
  }

  closeLinksLayer(){
    this.isOpen = false;
    this.eventEmmitter.emit("now");
  }

  followUnfollow(UserId:string) {
    this.postsService.followUnfollow(UserId).subscribe({
      next:(res)=>{
        console.log(res);
        this.isFollow= res.data.following;
       this.isFollow? this.followUnf='unfollow':this.followUnf='follow';
        console.log(res.data.following);
      },
      error:(err)=>{
        console.log(err);
      } 
    })
  }

}
