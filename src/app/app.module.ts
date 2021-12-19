import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/Header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingService } from './services/Listing.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthLoginComponent } from './Auth/AuthLogin/AuthLogin.component';
import { TobBarComponent } from './Header/TobBar/TobBar.component';
import { SharedLinkComponent } from './Shared/SharedLink/SharedLink.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthLoginComponent,
    TobBarComponent,
    SharedLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [ListingService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '589474938406-r32msaen3318nf03n47vmp2fk76g9jb1.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          },
        
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent,HeaderComponent,AuthLoginComponent,TobBarComponent,SharedLinkComponent]
})
export class AppModule { }
