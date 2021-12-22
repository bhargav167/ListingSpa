import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './Auth/AuthLogin/AuthLogin.component';
import { TobBarComponent } from './Header/TobBar/TobBar.component';
import { AboutUsComponent } from './Info/AboutUs/AboutUs.component';
import { ContactUsComponent } from './Info/ContactUs/ContactUs.component';
import { HelpComponent } from './Info/Help/Help.component';
import { PrivacyComponent } from './Info/Privacy/Privacy.component';
import { TermsConditionsComponent } from './Info/TermsConditions/TermsConditions.component';
import { SharedLinkComponent } from './Shared/SharedLink/SharedLink.component';


const routes: Routes = [
  {
    path: '',
    component:TobBarComponent
  },
  {
    path: 'login',
    component:AuthLoginComponent
  },
  {
    path: 'sharedLink',
    component:SharedLinkComponent
  },
  {
    path: 'aboutUs',
    component:AboutUsComponent
  },
  {
    path: 'privacypolicy',
    component:PrivacyComponent
  },
  {
    path: 'contactUs',
    component:ContactUsComponent
  },
  {
    path: 't&c',
    component:TermsConditionsComponent
  },
  {
    path: 'help',
    component:HelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
