import { ChangeDetectorRef,Component, inject } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCartComponent } from './components/post-cart/post-cart.component';
import { CreatPostComponent } from "./components/creat-post/creat-post.component";
import { Iposts } from '../../../../core/modules/iposts.interface';

@Component({
  selector: 'app-feed-content',
  imports: [PostCartComponent, CreatPostComponent],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent {

   private  readonly postsService=inject(PostsService)
  // private readonly cdr = inject(ChangeDetectorRef);

   postList:Iposts[]=[];
   ngOnInit(): void {
    this.getAllPosts()
   }

  getAllPosts(){
    this.postsService.getallposts().subscribe({
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
  reDrawing(){
     this.getAllPosts()
  }
}
