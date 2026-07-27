import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient=inject(HttpClient);
  
  headers:object={
      headers: {
        authorization :`Bearer ${localStorage.getItem("social token")}` 
      }
    }

  getallposts(pageNumber:number): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts?page=${pageNumber}`,this.headers)
  }

    creatPosts(body:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl+"/posts",body,this.headers)
  }
  deletePost(postId:string): Observable<any>{
      return this.httpClient.delete(environment.baseUrl+"/posts/"+postId,this.headers)
  }

  getLikesPost(postId:string): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/likes?page=1&limit=20`,this.headers)
  }
  
  followUnfollow(userId:string): Observable<any>{
   return this.httpClient.put(environment.baseUrl+`/users/${userId}/follow`,{},this.headers)
  }

  likeUnLink(postId:string): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/like`,{},this.headers) 
  }
  
  bookmarkUnBookmark(postId:string): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/bookmark`,{},this.headers) 
  }

  getAllBookMaks(): Observable<any>{
    return this.httpClient.get(environment.baseUrl+"/users/bookmarks",this.headers)
  }
  getSinglePost(postId:string): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}`,this.headers)
  }
  sharePost(postId:string,body:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/posts/${postId}/share`,body,this.headers)
  }
  getAllFollowingPost(): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/feed?only=following&limit=10`,this.headers)
  }
}
