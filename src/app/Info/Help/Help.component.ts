import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Help',
  templateUrl: './Help.component.html',
  styleUrls: ['./Help.component.css']
})
export class HelpComponent implements OnInit {

  authUser:any;
  constructor() {
    if (localStorage.getItem('user') == null)
      window.location.href = '/login'
    this.authUser = JSON.parse(localStorage.getItem('user')); 
   }

  ngOnInit() {
  }

  Logout(){
    localStorage.clear();
    window.location.href='/login';
  }
  HomeRedirect(){
    window.location.href='/';
  }
}
