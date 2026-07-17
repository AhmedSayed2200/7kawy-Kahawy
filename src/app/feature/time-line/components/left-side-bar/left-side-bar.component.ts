import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-left-side-bar',
  imports: [RouterLink,RouterLinkActive, RouterLinkActive],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css',
})
export class LeftSideBarComponent  
 {
  //       ngOnInit(): void {
  //   initFlowbite();
  // }

}
