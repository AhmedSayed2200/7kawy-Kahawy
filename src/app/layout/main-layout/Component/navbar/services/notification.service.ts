import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient=inject(HttpClient);

  headers:object={
      headers: {
        authorization :`Bearer ${localStorage.getItem("social token")}` 
      }
    }
  getAllNotification(pageNumber:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/notifications?page=${pageNumber}&limit=10`,this.headers)
  }

  markAsRead(notificationId:string):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+`/notifications/${notificationId}/read`,{},this.headers)
  }
    markAllAsRead():Observable<any>{
    return this.httpClient.patch(environment.baseUrl+`/notifications/read-all`,{},this.headers)
  }
  getNumberOfNotification():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/notifications/unread-count`,this.headers)
  }
}
