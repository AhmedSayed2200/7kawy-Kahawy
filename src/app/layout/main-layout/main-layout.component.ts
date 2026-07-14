import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
      ngOnInit(): void {
    initFlowbite();
  }
}
