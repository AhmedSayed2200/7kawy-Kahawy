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
    console.log(environment.baseUrl+"/posts/"+postId)
    return this.httpClient.post(environment.baseUrl+"/posts/"+postId+"/comments",body,this.headers)
  }

}

