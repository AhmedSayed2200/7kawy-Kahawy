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
                path: "time-line",component:TimeLineComponent,title:"Time Line"
            },
                        {
                path: "notification",component:NotificationComponent,title:"Notification"
            },            {
                path: "profile",component:ProfileComponent,title:"Profile"
            }
        ]
    },
    {
        path: "**",component:NotFoundComponent,title:"Not Fount"
    }
];
