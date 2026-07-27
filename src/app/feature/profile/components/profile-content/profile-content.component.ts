import { Component } from '@angular/core';
import { LeftSideBarProfileComponent } from "./components/left-side-bar-profile/left-side-bar-profile.component";
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@Component({
  selector: 'app-profile-content',
  imports: [LeftSideBarProfileComponent,MyProfileComponent],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.css',
})
export class ProfileContentComponent {
   isSidebarAppear:boolean = false;
}
