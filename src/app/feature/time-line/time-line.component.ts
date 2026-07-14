import { Component, OnInit } from '@angular/core';
import {initFlowbite } from 'flowbite';
import { NavbarComponent } from "../../layout/main-layout/Component/navbar/navbar.component";
import { LeftSideBarComponent } from "./components/left-side-bar/left-side-bar.component";
import { RigthSideBarComponent } from "./components/rigth-side-bar/rigth-side-bar.component";
import { FeedContentComponent } from "./components/feed-content/feed-content.component";
@Component({
  selector: 'app-time-line',
  imports: [NavbarComponent, LeftSideBarComponent, RigthSideBarComponent, FeedContentComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css',
})
export class TimeLineComponent implements OnInit  {


    ngOnInit(): void {
    initFlowbite();
  }

}
