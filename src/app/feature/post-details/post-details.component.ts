import { Component, inject } from '@angular/core';
import { PostCartComponent } from "../time-line/components/feed-content/components/post-cart/post-cart.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../../core/services/posts.service';
import { Iposts } from '../../core/modules/iposts.interface';

@Component({
  selector: 'app-post-details',
  imports: [PostCartComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  postId:string=""
  post!:Iposts;
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly postsService=inject(PostsService);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.postId=params.get("id")!;
    })
    this.getSinglePost();

  }
      getSinglePost(){
        this.postsService.getSinglePost(this.postId).subscribe({
          next: (res)=>{
            console.log(res);
            this.post = res.data.post;
          },
          error: (err)=>{
            console.log(err);
          }
        })
    }
}
