import { Component, inject, OnInit } from '@angular/core';
import { SuggestedFriendsService } from './services/suggested-friends.service';
import { IsuggestedFriends } from './modules/isuggested-friends.interface';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-suggestions-friends',
  imports: [],
  templateUrl: './suggestions-friends.component.html',
  styleUrl: './suggestions-friends.component.css',
})
export class SuggestionsFriendsComponent implements OnInit {
currentPage:number=0;
  suggestedFriends:IsuggestedFriends[]=[];
  hasMore:boolean = true;
  limitFriendsPerOnce:number = 15;
  private readonly suggestedFriendsService= inject(SuggestedFriendsService);
  private readonly postsService=inject(PostsService);

  ngOnInit(): void {

    this.getSuggestedFriends();

  }

   getSuggestedFriends(isFromSuggestedHtml:boolean=false){
    this.currentPage++;
    this.suggestedFriendsService.getSuggestedFriends(this.currentPage).subscribe({
      next:(res)=>{
        console.log(res);
        res.data.suggestions = res.data.suggestions.map((friend: IsuggestedFriends) => {
        return {
          ...friend,
          isFollowed: false
         };
      });
      console.log( res.data.suggestions)
        if(!isFromSuggestedHtml)
           this.suggestedFriends=res.data.suggestions;
          else{
             this.suggestedFriends=[...this.suggestedFriends,...res.data.suggestions]; 
             if(res.data.suggestions.length <this.limitFriendsPerOnce)
                   this.hasMore=false;    
          }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   }

   deleteSuggetFriend(suggestId:string){
     this.suggestedFriends = this.suggestedFriends.filter(friend => friend._id !== suggestId);
   }
   followUnFollow(userId:string){
    this.postsService.followUnfollow(userId).subscribe({
      next:(res)=>{
          console.log(res);
         
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
}
