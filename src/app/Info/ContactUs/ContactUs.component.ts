import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ContactUs',
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css']
})
export class ContactUsComponent implements OnInit {

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
