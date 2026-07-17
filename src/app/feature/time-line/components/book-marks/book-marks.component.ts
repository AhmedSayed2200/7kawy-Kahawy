import { Component, inject, OnInit } from '@angular/core';
import { PostCartComponent } from '../feed-content/components/post-cart/post-cart.component';
import { PostsService } from '../../../../core/services/posts.service';
import { Iposts } from '../../../../core/modules/iposts.interface';

@Component({
  selector: 'app-book-marks',
  imports: [PostCartComponent],
  templateUrl: './book-marks.component.html',
  styleUrl: './book-marks.component.css',
})
export class BookMarksComponent implements OnInit {
  postList:Iposts[]=[];
  private readonly postsService=inject(PostsService)
  ngOnInit(): void {

 this.getAllBookMaks();
    
  }
  getAllBookMaks(){
    this.postsService.getAllBookMaks().subscribe({
      next:(res)=>{
        console.log(res);
        this.postList = res.data.bookmarks.reverse()
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
