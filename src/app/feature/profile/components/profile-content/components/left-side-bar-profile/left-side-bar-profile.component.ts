import { Component, AfterViewInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { initCarousels } from 'flowbite';
import { PostsService } from '../../../../../../core/services/posts.service';
import { ProfileService } from '../../../../services/profile.service';
import { IFollower } from '../../../../modules/ifollower.interface';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-left-side-bar-profile',
  imports: [NgClass],
  templateUrl: './left-side-bar-profile.component.html',
  styleUrl: './left-side-bar-profile.component.css',
})
export class LeftSideBarProfileComponent  {
  followerNumber:number=0;
  followingNumber:number=0;
  animationState: string = ''; 
    myId:string="";
   
    activeTab: 'followers' | 'following' = 'followers';
  follower!:IFollower;
  following!:IFollower;
followingList: IFollower[] =[]
followers: IFollower[] =[]
    private readonly postsService=inject(PostsService)
  private readonly profileService=inject(ProfileService);
  private readonly activatedRoute=inject(ActivatedRoute)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.paramMap.subscribe(param=> {
      this.myId=param.get("id") as string;
    })


  this.getFollowersFollowing(this.myId)
//  setTimeout(() => {
//         initCarousels();
//       }, 0);

  }



     getFollowersFollowing(userId:string){
      this.profileService.getFollowersFollowing(userId).subscribe({
        next:(res)=>{
          console.log(res);

          // following

          this.followingList = res.data.user.following.map((follower:IFollower) => {
          return {
            ...follower,
            isFollowed: true
           };
        });


       if (this.followingList.length > 0) {
        this.following = this.followingList[0];
        this.followingNumber = 0;
      }
      console.log( "following",this.followingList)


                 // followers

      res.data.user.followers = res.data.user.followers.map((follower: IFollower) => {
        const isAlreadyFollowed = this.followingList.some(
          following => following._id === follower._id
        );
        return {
          ...follower,
          isFollowed: isAlreadyFollowed 
        };
      });

        console.log( "followers",res.data.user.followers)
        this.followers=res.data.user.followers;
        if (this.followers.length > 0) {
        this.follower = this.followers[0];
        this.followerNumber = 0;
      }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
     }


  followUnFollow(userId:string){
    this.postsService.followUnfollow(userId).subscribe({
      next:(res)=>{
          console.log(res);
          this.getFollowersFollowing(this.myId)
         
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }


changeTab(tab: 'followers' | 'following') {
    this.activeTab = tab;
  }

  next() {
    if (this.animationState) return; 
    this.animationState = 'exit-left';
    
    setTimeout(() => {
      if (this.activeTab === 'followers') {
        if (this.followers.length - 1 === this.followerNumber) {
          this.followerNumber = 0;
        } else {
          this.followerNumber++;
        }
        this.follower = this.followers[this.followerNumber];
      } else {
        if (this.followingList.length - 1 === this.followingNumber) {
          this.followingNumber = 0;
        } else {
          this.followingNumber++;
        }
        this.following = this.followingList[this.followingNumber];
      }
      
      this.animationState = 'enter-right';
      setTimeout(() => this.animationState = '', 50);
    }, 250); 
  }

  prev() {
    if (this.animationState) return;
    this.animationState = 'exit-right';
    
    setTimeout(() => {
      if (this.activeTab === 'followers') {
        if (this.followerNumber === 0) {
          this.followerNumber = this.followers.length - 1;
        } else {
          this.followerNumber--;
        }
        this.follower = this.followers[this.followerNumber];
      } else {
        if (this.followingNumber === 0) {
          this.followingNumber = this.followingList.length - 1;
        } else {
          this.followingNumber--;
        }
        this.following = this.followingList[this.followingNumber];
      }
      
      this.animationState = 'enter-left';
      setTimeout(() => this.animationState = '', 50);
    }, 250);
  }




}