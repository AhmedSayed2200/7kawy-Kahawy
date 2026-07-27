import { Component, inject } from '@angular/core';
import { PostCartComponent } from '../feed-content/components/post-cart/post-cart.component';
import { Iposts } from '../../../../core/modules/iposts.interface';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-feed-posts',
  imports: [PostCartComponent],
  templateUrl: './feed-posts.component.html',
  styleUrl: './feed-posts.component.css',
})
export class FeedPostsComponent {

   postList:Iposts[]=[];
  private readonly postsService=inject(PostsService)
  ngOnInit(): void {

     this.getAllFollowingPost();
    
  }
  getAllFollowingPost(){
    this.postsService.getAllFollowingPost().subscribe({
      next:(res)=>{
        console.log(res);
        this.postList = res.data.posts
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
