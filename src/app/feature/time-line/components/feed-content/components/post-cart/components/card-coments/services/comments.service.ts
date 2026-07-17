import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private readonly httpClient=inject(HttpClient) 

    headers:object={
      headers: {
        authorization :`Bearer ${localStorage.getItem("social token")}` 
      }
    }

  getPostsComments(postId:string): Observable<any> {
    return this.httpClient.get(environment.baseUrl+"/posts/"+postId+"/comments?page=1&limit=10",this.headers);
  }

    creatComment(postId:string,body:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl+"/posts/"+postId+"/comments",body,this.headers)
  }
    likeUnLinkComment(postId:string,commentId:string): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/comments/${commentId}/like`,{},this.headers) 
  }

  deleteComment(postId:string,commentId:string): Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/posts/${postId}/comments/${commentId}`,this.headers) 
  }

  getCommentReplies(postId:string,commentId:string): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,this.headers)
  }

  createReply(postId:string,commentId:string,body:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/posts/${postId}/comments/${commentId}/replies`,body,this.headers)
  }

   updateComment(postId:string,commentId:string,body:object): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/posts/${postId}/comments/${commentId}`,body,this.headers)
  }



}

