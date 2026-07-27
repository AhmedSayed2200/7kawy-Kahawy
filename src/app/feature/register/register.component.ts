// import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject } from '@angular/core';
import { empty, Subscription } from 'rxjs';
import { AuthService } from '../../core/Auth/services/auth.service';
@Component({
  selector: 'app-register',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService=inject(AuthService)
  // private readonly cdr = inject(ChangeDetectorRef);
  private readonly router=inject(Router)
  msgError:string=""
  loading:boolean = false;
  ImgUrl:string="";
  registerSubscribe:Subscription=new Subscription();
  registerForm: FormGroup =new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    dateOfBirth :new FormControl("",[Validators.required]),
    gender:new FormControl("",Validators.required),
    password:new FormControl("",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl("",[Validators.required])
  },{validators:[this.rePasswordValidation]})

  ngOnInit(): void {

    this.setImgsByTheme()
  }
  setImgsByTheme(){
   this.ImgUrl= localStorage.getItem("theme")==='dark'?"/images/HelloDark.png":"/images/lastman2.png";
  }
  submitDate(){
    if(this.registerForm.valid){
      this.loading=true;
      this.registerSubscribe.unsubscribe();
      this.registerSubscribe=this.authService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
           console.log(res);
          this.msgError="";
          this.router.navigate(["/login"]);
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
      this.registerForm.markAllAsTouched();
    }
  }
  getInputClasses(controlName: string){
  return {
    'border-green-700': this.registerForm.get(controlName)?.valid,
    'border-red-700': this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  };
}

  rePasswordValidation(myForm:AbstractControl){
    const passwordControl= myForm.get("password");
    const rePasswordControl= myForm.get("rePassword");

    if(passwordControl?.value !== rePasswordControl?.value && rePasswordControl?.value !== ""){
      rePasswordControl?.setErrors({mismatch:true});
      return {mismatch:true}
    }
    return null;
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
