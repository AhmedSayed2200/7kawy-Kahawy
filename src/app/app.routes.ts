import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { TimeLineComponent } from './feature/time-line/time-line.component';
import { NotificationComponent } from './feature/notification/notification.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { forwardGuard } from './core/Auth/guards/forward-guard';
import { backwardGuard } from './core/Auth/guards/backward-guard';
import { ChangePasswordComponent } from './feature/change-password/change-password.component';
import { FeedContentComponent } from './feature/time-line/components/feed-content/feed-content.component';
import { SuggestionsFriendsComponent } from './feature/time-line/components/suggestions-friends/suggestions-friends.component';
import { BookMarksComponent } from './feature/time-line/components/book-marks/book-marks.component';
import { PostDetailsComponent } from './feature/post-details/post-details.component';
import { FeedPostsComponent } from './feature/time-line/components/feed-posts/feed-posts.component';

export const routes: Routes = [
    {
        path: "",redirectTo:"login",pathMatch:"full",
    },
    {
        path: "",component:AuthLayoutComponent ,canActivate:[backwardGuard] , children:[
            {
                path: "login",component:LoginComponent,title:"Login"
            },
            {
                path: "register",component:RegisterComponent,title:"Register"
            }
        ]
    },
    {
        path: "",component:MainLayoutComponent,canActivate:[forwardGuard],children: [
            {
             path: "",component:TimeLineComponent,children:[
                    {
                        path: "time-line",component:FeedContentComponent,title:"Time Line"
                    },
                    {
                        path: "suggestions-Friends",component:SuggestionsFriendsComponent,title:"suggestions Friends"
                    },
                    {
                        path: "saved-posts",component:BookMarksComponent,title:"BookMarks",
                    },
                    {
                        path: "feed-posts",component:FeedPostsComponent,title:"feed-posts"
                    }
                ]
            },
            {
                path: "notification",component:NotificationComponent,title:"Notification"
            },            {
                path: "profile/:id",component:ProfileComponent,title:"Profile"
            },
            {
                path: "Change Password",component:ChangePasswordComponent,title:"Change Password"
            },
            {
                path: "details/:id",component:PostDetailsComponent,title:"Post Details"
            }
        ]
    },
    {
        path: "**",component:NotFoundComponent,title:"Not Fount"
    }
];
