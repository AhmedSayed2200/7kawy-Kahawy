import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/Auth/services/auth.service';
import { initFlowbite } from 'flowbite';
import { IuserDetails } from '../../../../core/modules/iuser-details.interface';
import { NotificationService } from './services/notification.service';
import { INotification } from './modules/inotification.interface';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy  {
 notificationList:INotification[]=[];
 unReadNotificationList:INotification[]=[];
 displayedList!:INotification[];
  pageNumber: number=0;
   unReadNotificationsCount: number=0;
isLastPage: boolean = false;
activeTab: 'all' | 'unread' = 'all';
activeMode=localStorage.getItem("theme");
  userDetails:IuserDetails=JSON.parse(localStorage.getItem("user data")!);
private pollingSubscription!: Subscription;
  private readonly authService=inject(AuthService)
  private readonly notificationService=inject(NotificationService);
  
  ngOnInit(): void {
    this.getAllNotification();
    this.getNumberOfNotification()
    this.startPolling();
  }

  
changeMode() {

   if(localStorage.getItem("theme") === "dark"){
       document.documentElement.classList.remove("dark");
     localStorage.setItem("theme","light"); 
    this.activeMode='light';
    }
      else{
     document.documentElement.classList.add("dark");
     localStorage.setItem("theme","dark");
     this.activeMode='dark';
      }

}

  getAllNotification(fromMarkallRead?:boolean) {
    if(!fromMarkallRead)
         this.pageNumber++;
    console.log(this.pageNumber);
    this.notificationService.getAllNotification( this.pageNumber).subscribe({
      next:(res) => {
        if(this.pageNumber==1)
           this.notificationList=res.data.notifications;
          else
              this.notificationList=[...  this.notificationList,...res.data.notifications]
            this.unReadNotificationList=this.notificationList.filter(notification => !notification.isRead )
            this.displayedList=this.notificationList;
     if( res.data.notifications.length <10)
              this.isLastPage=true;

      },
      error:(err) => {
        console.log(err);
      }

    })
  }

  getNumberOfNotification(){
    this.notificationService.getNumberOfNotification().subscribe({
      next:(res)=> {
        console.log(res);
        this.unReadNotificationsCount=res.data.unreadCount;
      },
      error:(err) => {
        console.log(err);
      } 
    })
  }

  markAsRead(notificationId:string){
    this.notificationService.markAsRead(notificationId).subscribe({
      next:(res)=> {
      },
      error(err) {
        console.log("check",err);
      },
    })
  }

  markAllAsRead(){
    this.notificationService.markAllAsRead().subscribe({
      next:(res)=> {
        console.log(res)
        this.getAllNotification(true);
        this.getNumberOfNotification();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  startPolling() {
    this.pollingSubscription = interval(60000).subscribe(() => {
        this.getAllNotification(true);
      this.getNumberOfNotification(); 
    });
  }
ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  logOut(){
    this.authService.singOut();
  }




}
