import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
    headers:object={
      headers: {
        authorization :`Bearer ${localStorage.getItem("social token")}` 
      }
    }
  private readonly httpClient=inject(HttpClient);
   
  getProfilePost(userId:string): Observable<any>{ 
    return this.httpClient.get(environment.baseUrl+`/users/${userId}/posts`,this.headers)
  }

  getFollowersFollowing(userId:string): Observable<any>{ 
   return  this.httpClient.get(environment.baseUrl+`/users/${userId}/profile`,this.headers)
  }
  getUserProfile(userId:string): Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/users/${userId}/profile`,this.headers)
  }

  updateProfilePhoto(body:Object): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/users/upload-photo`,body,this.headers)
  }

  uploadCoverProfile(body:Object): Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/users/upload-cover`,body,this.headers)
  }

}


