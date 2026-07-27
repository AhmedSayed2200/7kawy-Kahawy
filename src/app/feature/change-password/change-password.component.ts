import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ChangePasswordService } from './services/change-password.service';
import { AuthService } from '../../core/Auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly changePasswordService=inject(ChangePasswordService);
  private readonly authService=inject(AuthService);
    changePasswordForm: FormGroup =new FormGroup({
    password:new FormControl("",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    newPassword:new FormControl("",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    confirmPassword:new FormControl("",[Validators.required])
  },{validators:[this.rePasswordValidation]})
  rePasswordValidation(myForm:AbstractControl){
    const newPassword= myForm.get("newPassword");
    const confirmPassword= myForm.get("confirmPassword");
    if(newPassword?.value !== confirmPassword?.value && confirmPassword?.value !== ""){
      confirmPassword?.setErrors({mismatch:true});
      return {mismatch:true}
    }
    return null;
  }

  submitDate(){
     if(this.changePasswordForm.valid){
      console.log("yalla");
      console.log(this.changePasswordForm.value);
      const { confirmPassword, ...modelData } = this.changePasswordForm.value;
       this.changePassword(modelData)
  }    else{
      this.changePasswordForm.markAllAsTouched();
    }
  }

  changePassword(body:object){
    this.changePasswordService.changePassword(body).subscribe({
      next:(res)=>{
         this.logOut()
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

    logOut(){
    this.authService.singOut();
  }





}
