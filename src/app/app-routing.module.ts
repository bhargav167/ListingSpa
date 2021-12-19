import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './Auth/AuthLogin/AuthLogin.component';
import { HeaderComponent } from './Header/Header.component';
import { TobBarComponent } from './Header/TobBar/TobBar.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
