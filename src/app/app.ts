import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SocialApp');
  ngOnInit(): void {

    this.setThemeMode();
  }
  setThemeMode() {
  if(("theme" in localStorage)){
      if(localStorage.getItem("theme") === "dark")
       document.documentElement.classList.add("dark");
      else
      document.documentElement.classList.remove("dark");
  }
  else if(window.matchMedia("(prefers-color-scheme: dark)").matches)
  {
     document.documentElement.classList.add("dark");
     localStorage.setItem("theme","dark");
  }
  else
  {
     document.documentElement.classList.remove("dark");
     localStorage.setItem("theme","light"); 
  }
}

}
