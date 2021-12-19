import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthUser } from 'src/app/Model/AuthUser';
import { AuthServicesService } from 'src/app/services/AuthServices.service';

@Component({
  selector: 'app-AuthLogin',
  templateUrl: './AuthLogin.component.html',
  styleUrls: ['./AuthLogin.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public btnLoader: boolean;

  authForm:FormGroup;
  user:AuthUser;
  constructor(private authService: SocialAuthService,private fb:FormBuilder,private _auth:AuthServicesService) { }

  ngOnInit() {
    this.createAuthForm();
  }
  createAuthForm() { 
      this.authForm = this.fb.group({  
        Email:[''],
        LoginProvider: ['GOOGLE'],
        ImageUrl:[''], 
        Name:['']
      }) 
  } 
  // Google Login
  signInWithGoogle(): void {
    this.btnLoader=true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: any) => { 
       
        this.authForm.controls['Email'].setValue(data.email);
        this.authForm.controls['Name'].setValue(data.name);
        this.authForm.controls['ImageUrl'].setValue(data.photoUrl);
        this.authForm.controls['LoginProvider'].setValue(data.provider);
       
        this.user = Object.assign({}, this.authForm.value);
        this._auth.Login(this.user).subscribe((data: SocialAuthService) => { 
          localStorage.setItem('user',JSON.stringify(data));
          this.btnLoader=false;
          location.href='/';
        })
      });
  }
}
