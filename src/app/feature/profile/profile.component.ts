import { Component } from '@angular/core';
import { ProfileHeaderComponent } from "./components/profile-header/profile-header.component";
import { ProfileContentComponent } from "./components/profile-content/profile-content.component";

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, ProfileContentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
