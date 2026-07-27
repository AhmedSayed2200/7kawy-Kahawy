import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { IuserDetails } from '../../../../core/modules/iuser-details.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  MyProfileUser!:IuserDetails
  user!:IuserDetails;
  myId:string="";
  userId:string="";
  followersCount:number=0;
  followingCount:number=0;
  bookmarksCount:number=0;
  postCount:number=0;
  photoProfilePhotoUrl:string | ArrayBuffer | null | undefined;
  photoProfilePhotoFile!:File;
  photoProfileCoverUrl:string | ArrayBuffer | null | undefined;
  photoProfileCoverFile!:File;
    private readonly profileService=inject(ProfileService);
    private readonly activatedRoute=inject(ActivatedRoute);
  ngOnInit(): void {
    this.MyProfileUser=JSON.parse(localStorage.getItem("user data")!)
    this.myId=this.MyProfileUser._id;
    this.activatedRoute.paramMap.subscribe(param=>{
      this.userId=param.get('id') as string;
    })
    this.getUserProfile(this.userId);
    this.getNumberPosts(this.userId);
  }

  getUserProfile(userId:string) {
        this.profileService.getUserProfile(userId).subscribe({
      next: (res) => {
        this.followersCount=res.data.user.followersCount;
        this.followingCount=res.data.user.followingCount;
        this.bookmarksCount=res.data.user.bookmarksCount;
        // console.log("checkkkkkk",res.data.user.bookmarksCount)
        this.user=res.data.user;
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  getNumberPosts(userId:string){
    this.profileService.getProfilePost(userId).subscribe({
      next: (res) => {
        this.postCount=res.data.posts.length;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  updateProfilePhoto(body:object){
    this.profileService.updateProfilePhoto(body).subscribe({
      next: (res) => {
        this.MyProfileUser.photo=this.photoProfilePhotoUrl as string;
        this.user.photo=this.MyProfileUser.photo;
           localStorage.setItem("user data",JSON.stringify( this.MyProfileUser))
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  uploadProfileCover(body:Object){
      this.profileService.uploadCoverProfile(body).subscribe({
        next: (res) => {
          console.log(res);
            this.MyProfileUser.cover=this.photoProfileCoverUrl as string;
            this.user.cover= this.MyProfileUser.cover;
           localStorage.setItem("user data",JSON.stringify( this.MyProfileUser))
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  setPhotoProfile(PhotoProfile:HTMLInputElement){
    const formDate=new FormData();
    if(PhotoProfile.files){
        this.photoProfilePhotoFile=PhotoProfile.files[0];
      formDate.append("photo",this.photoProfilePhotoFile)
      const fileReader=new FileReader()
      fileReader.readAsDataURL(this.photoProfilePhotoFile);
      fileReader.onload = (res)=>{
        this.photoProfilePhotoUrl=res.target?.result;
      }
        this.updateProfilePhoto(formDate);
    }
   
  }

    setCoverProfile(coverProfile:HTMLInputElement){
    const formDate=new FormData();
    if(coverProfile.files){
        this.photoProfileCoverFile=coverProfile.files[0];
      formDate.append("cover",this.photoProfileCoverFile)
      const fileReader=new FileReader()
      fileReader.readAsDataURL(this.photoProfileCoverFile);
      fileReader.onload = (res)=>{
        this.photoProfileCoverUrl=res.target?.result;
      }
        this.uploadProfileCover(formDate);
    }
   
  }


}

