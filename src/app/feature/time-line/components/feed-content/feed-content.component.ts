import { ChangeDetectorRef,Component, ElementRef, inject, ViewChild } from '@angular/core';
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

   postList:Iposts[]=[];
   newPosts:Iposts[]=[];
   currentPage = 0;
  isLoading = false;
  hasMore = true;
  private observer!: IntersectionObserver;
  @ViewChild('anchor') anchor!: ElementRef<HTMLDivElement>;
   private  readonly postsService=inject(PostsService)
  // private readonly cdr = inject(ChangeDetectorRef);

   ngOnInit(): void {
    this.getAllPosts()
   }

   ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.isLoading && this.hasMore) {
        this.getAllPosts();
      }
    }, {
      rootMargin: '1000px' 
      });

    if (this.anchor) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  getAllPosts(isFromCreatePost:boolean = false){
    let pageNumber:number = 1;
    if (this.isLoading) return;
    this.isLoading = true;
    if(!isFromCreatePost){
      this.currentPage++;
     pageNumber=this.currentPage;
    }
    this.postsService.getallposts(pageNumber).subscribe({
      next:(res) => {
        this.newPosts = res.data.posts
         if(!isFromCreatePost)
         {
        this.postList = [...this.postList,...this.newPosts]
        if( this.postList.length<40)
            this.hasMore = false;
         }
         else{
          this.postList= this.newPosts;
         }
          this.isLoading = false;
        console.log(this.postList);
     
      },
      error:(err) => {
        this.isLoading = false;
        console.log(localStorage.getItem("social token"))
        console.log(err);
      }
    })
  }
  reDrawing(){
     this.getAllPosts(true);
  }

ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
