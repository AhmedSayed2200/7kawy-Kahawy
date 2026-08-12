import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/Auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

   private readonly authService=inject(AuthService)
  // private readonly cdr = inject(ChangeDetectorRef);
  private readonly router=inject(Router)

  msgError:string=""
  loading:boolean = false;
  registerSubscribe:Subscription=new Subscription();
  activeThemeMode=localStorage.getItem("theme");
  ImgUrlHakawy:string="";
  ImgUrlSahla:string="";
  loginForm: FormGroup =new FormGroup({
    login: new FormControl("",[Validators.required,Validators.minLength(3)]),
    password:new FormControl("",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })

  ngOnInit(): void {

    this.setImgsByTheme()
  }
  setImgsByTheme(){
   this.ImgUrlHakawy= localStorage.getItem("theme")==='dark'?"/images/7akawyBlack.png":"/images/7kawywhite.png";
   this.ImgUrlSahla= localStorage.getItem("theme")==='dark'?"/images/lastman.png":"/images/lastman2.png";
  }

  submitDate(){
    if(this.loginForm.valid){
      this.loading=true;
      this.registerSubscribe.unsubscribe();
      this.registerSubscribe=this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
           console.log(res);
          this.msgError="";
          localStorage.setItem("social token",res.data.token);
          localStorage.setItem("user data",JSON.stringify(res.data.user));
          this.router.navigate(["/time-line"]);
        },
        error:(err)=>{
          console.log(err);
          this.msgError=err.error.message;
          console.log(this.msgError);
          this.loading=false;
          console.log("error",this.loading);
          // this.cdr.detectChanges();
        },
        complete:()=>{
          this.loading=false;
          console.log("complete",this.loading);
          // this.cdr.detectChanges();
        }  

      }) 
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
  getInputClasses(controlName: string){
  return {
    'border-green-700': this.loginForm.get(controlName)?.valid,
    'border-red-700': this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  };
}

  disbalypassword(element:HTMLInputElement){
    if(element.type==="password"){
      element.type="text"
    }
    else{
     element.type="password" 
    }
      // element.type==="password"?element.type="text":element.type="password";
  }
}
