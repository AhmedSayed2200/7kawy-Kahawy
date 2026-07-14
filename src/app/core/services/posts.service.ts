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

  getallposts(): Observable<any>{
    return this.httpClient.get(environment.baseUrl+"/posts",this.headers)
  }

    creatPosts(body:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl+"/posts",body,this.headers)
  }
  deletePost(postId:string): Observable<any>{
      return this.httpClient.delete(environment.baseUrl+"/posts/"+postId,this.headers)
  }

}
