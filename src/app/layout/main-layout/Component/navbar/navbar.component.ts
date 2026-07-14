import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/Auth/services/auth.service';
import { initFlowbite } from 'flowbite';
import { IuserDetails } from '../../../../core/modules/iuser-details.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {

  private readonly authService=inject(AuthService)

  //   ngOnInit(): void {
  //   initFlowbite();
  // }

  logOut(){
    this.authService.singOut();
  }

  userDetails:IuserDetails=JSON.parse(localStorage.getItem("user data")!);
    
}
