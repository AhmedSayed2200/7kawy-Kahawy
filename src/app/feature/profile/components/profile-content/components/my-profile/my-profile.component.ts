import { Component, inject } from '@angular/core';
import { CreatPostComponent } from "../../../../../time-line/components/feed-content/components/creat-post/creat-post.component";
import { FeedContentComponent } from "../../../../../time-line/components/feed-content/feed-content.component";
import { PostCartComponent } from "../../../../../time-line/components/feed-content/components/post-cart/post-cart.component";
import { ProfileService } from '../../../../services/profile.service';
import { Iposts } from '../../../../../../core/modules/iposts.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [CreatPostComponent, FeedContentComponent, PostCartComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
userId: string="";
profilePostList:Iposts[]=[];
myId:string="";
private readonly profileService=inject(ProfileService);
private readonly activatedRoute=inject(ActivatedRoute);


  ngOnInit(): void {
    this.myId=JSON.parse(localStorage.getItem("user data")!)._id;
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId=param.get("id");
    })
    this.geProfilePosts()
  }

  geProfilePosts(){
    this.profileService.getProfilePost(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.profilePostList=res.data.posts;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
